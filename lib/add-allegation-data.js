'use strict';

var _ = require('lodash');
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

  module.exports = {
    addAllegationData
  };