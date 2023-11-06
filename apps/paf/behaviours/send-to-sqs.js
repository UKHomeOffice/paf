'use strict';

const { v4: uuidv4 } = require('uuid');
const { sendToQueue } = require('../../../lib/utils');
var _ = require('lodash');
const fieldsMap = require('../../../lib/ims-hof-fields-map.json');
const valuesMap = require('../../../lib/ims-hof-values-map.json');

let eform = {
    "EformFields": []
  }

  const addFieldToEform = (fieldName, fieldValue) => {
     eform.EformFields.push({"FieldName" : fieldName, "FieldValue" : fieldValue}) ;
  }

  const addGroup = (value)  => {
    addField(value, value);
  };

  const addField = (name, value) => {
    let imsName = _.find(fieldsMap.Fields, {"HOF":name});
    if ( imsName != undefined) {
      let imsValue = _.find(valuesMap.Values, {"HOF":value});
      if (imsValue != undefined ) {
        addFieldToEform(imsName.IMS, imsValue.IMS);
      }
      else {
        addFieldToEform(imsName.IMS, value);
      }
    }
  };

  const addAllegationData = (data) => {
    Object.entries(data).forEach(entry => {
      const [key, value] = entry;
      if (value != '') {
        if (key.includes('group')) {
          const groups = Array.isArray(value) ? value : value.split(",");
          groups.map(addGroup);
        }
        else {
          addField(key, value);
        }
      }
    });
    return JSON.stringify(eform);
  }

module.exports = superclass => class SendToSQS extends superclass {
  // eslint-disable-next-line consistent-return
  saveValues(req, res, next) {
    let allegationId;
    let allegationData;

    try {
      allegationId = uuidv4();
      allegationData = addAllegationData(req.sessionModel.attributes);

      return sendToQueue(allegationData, allegationId)
          .then(() => {
              next();
          })
          .catch(err => {
              SendToSQS.handleError(next, err, allegationId, allegationData);
          });
    } catch (err) {
        SendToSQS.handleError(next, err, allegationId, allegationData);
    }
  }

  static handleError(next, err, id, data) {
    const allegationDetails = {
      allegationId: id,
      data
    };
    err.formNotSubmitted = true;
    err.allegationDetails = allegationDetails;
    // eslint-disable-next-line no-console
    console.error('Failed to send to SQS queue: ', err);
    return next(err);
  }
};
