'use strict';
const { Producer } = require('sqs-producer');
var _ = require('lodash');
const config = require('../config');
const fieldsMap = require('./ims-hof-fields-map.json');
const valuesMap = require('./ims-hof-values-map.json');

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

const addFields = (data) => {
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

const sendToQueue = (data, id) => {
  try {
    const producer = Producer.create(config.awsSqs);

    return new Promise((resolve, reject) => {
      producer.send(
        [
          {
            id,
            body: data
          }
        ])
        .then(response => {
          const log = {
            sqsResponse: response,
            allegationDetails: {
              sqsMessageId: response[0].MessageId,
              allegationId: id,
              data
            }
          };
          // eslint-disable-next-line no-console
          console.log('Successfully sent to SQS queue: ', log);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  } catch (err) {
    throw new Error('Failed to send to sqs queue', err);
  }
};

module.exports = {
  addFields,
  sendToQueue
};
