'use strict';
/* eslint-disable */
const _ = require('lodash');
const fieldsMap = require('./ims-hof-fields-map.json');
const valuesMap = require('./ims-hof-values-map.json');

const eform = {
  EformFields: [],
  AdditionalPeople: [],
  Attachments: []
};

const addFieldToEform = (fieldName, fieldValue) => {
  if (fieldName === 'images') {
    eform.Attachments = fieldValue;
  } else if (fieldName === 'txpermoreallholder') {
    eform.AdditionalPeople.push({FieldName: fieldName, FieldValue: fieldValue});
  } else {
    eform.EformFields.push({FieldName: fieldName, FieldValue: fieldValue});
  }
};

const addField = (name, value) => {
  const imsName = _.find(fieldsMap.Fields, {HOF: name});
  if ( imsName !== undefined && !(name === 'images')) {
    const imsValue = _.find(valuesMap.Values, {HOF: value});
    if (imsValue !== undefined ) {
      addFieldToEform(imsName.IMS, imsValue.IMS);
    } else {
      addFieldToEform(imsName.IMS, value);
    }
  }
  if (name === 'images') {
    addFieldToEform(name, value);
  }
};

const addGroup = value  => {
  addField(value, value);
};

const addAllegationData = data => {
  Object.entries(data).forEach(entry => {
    const [key, value] = entry;
    if (value !== '') {
      if (key.includes('group')) {
        const groups = Array.isArray(value) ? value : value.split(',');
        groups.map(addGroup);
      } else {
        addField(key, value);
      }
    }
  });
  return JSON.stringify(eform);
};


module.exports = {
  addAllegationData
};
