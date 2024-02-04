/* eslint-disable */
const _ = require('lodash');
const fieldsMap = require('../../../lib/ims-hof-fields-map.json');

module.exports = superclass => class  extends superclass {
  configure(req, res, next) {
    const persons = req.sessionModel.get('persons');
    if (persons) {
      const additionalPeople = [];

      _.forEach(persons.aggregatedValues, i => {
        console.log('Person :: ', i);
        const value = new Array();
        i.fields.map(item => item.value !== '' ?
          value.push({Key: _.find(fieldsMap.Fields, {HOF: item.field}).IMS,
          StringValue: item.value}) : '');

        additionalPeople.push(value);

        req.sessionModel.set('persons', additionalPeople);
      });
    } else {
      req.sessionModel.unset('persons');
    }
    return super.configure(req, res, next);
  }
};