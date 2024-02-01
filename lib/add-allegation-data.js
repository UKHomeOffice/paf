'use strict';
/* eslint-disable */
const _ = require('lodash');
const fieldsMap = require('./ims-hof-fields-map.json');
const valuesMap = require('./ims-hof-values-map.json');

const addFieldToEform = (eform, fieldName, fieldValue) => {
  if (fieldName === 'images') {
    eform.Attachements.push({url: fieldValue});
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
    if (imsValue !== undefined ) {
      addFieldToEform(eform, imsName.IMS, imsValue.IMS);
    } else {
      addFieldToEform(eform, imsName.IMS, value);
    }
  }
  if (name === 'images') {
    console.log('Value :: ', value);
    addFieldToEform(eform, name, value);
  }
};

const addAllegationData = data => {
  const eform = {
    EformFields: [],
    AdditionalPeople: [],
    Attachements: []
  };

  Object.entries(data).forEach(entry => {
    const [key, value] = entry;
    if (value !== '' && key !== 'images') {
      if (key.includes('group')) {
        const groups = Array.isArray(value) ? value : value.split(',');
        groups.map(value => {
          addField(eform, value, value);
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
