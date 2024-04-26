'use strict';

const _ = require('lodash');
const fieldsMap = require('./ims-hof-fields-map.json');
const valuesMap = require('./ims-hof-values-map.json');

const addFieldToEform = (eform, fieldName, fieldValue) => {
  if (fieldName === 'images') {
    eform.Attachments = fieldValue;
  } else if (fieldName === 'tbwhoaddperson') {
    eform.AdditionalPeople = fieldValue;
  } else {
    eform.EformFields.push({FieldName: fieldName, FieldValue: fieldValue});
  }
};

const addField = (eform, name, value) => {
  const imsName = _.find(fieldsMap.Fields, {HOF: name});
  if ( imsName !== undefined && !(name === 'images')) {
    const imsValue = _.find(valuesMap.Values, {HOF: value});
    if (imsValue !== undefined && !imsName.IMS.startsWith('tx')) {
      addFieldToEform(eform, imsName.IMS, imsValue.IMS);
    } else {
      let hofValue = value;
      if (value === 'yes' | value === 'no') {
        hofValue = value.charAt(0).toUpperCase() + value.slice(1);
      }
      addFieldToEform(eform, imsName.IMS, hofValue);
    }
  }
  if (name === 'images') {
    addFieldToEform(eform, name, value);
  }
};

const addAllegationData = data => {
  const eform = {
    EformFields: [],
    AdditionalPeople: [],
    Attachments: []
  };

  Object.entries(data).forEach(entry => {
    const [key, value] = entry;
    if (value !== '') {
      if (key.includes('group')) {
        const groups = Array.isArray(value) ? value : value.split(',');
        groups.map(item => {
          addField(eform, item, item);
        });
      } else {
        addField(eform, key, value);
      }
    }
  });
  return JSON.stringify(eform);
};

module.exports = {
  addAllegationData
};
