const _ = require('lodash');
const fieldsMap = require('../../../lib/ims-hof-fields-map.json');
const valuesMap = require('../../../lib/ims-hof-person-add-values.json');

const transform = item => {
  const value = _.find(valuesMap.Values, {HOF: item.value});
  const imsValue = value === undefined ? item.value : value.IMS;
  return {Key: _.find(fieldsMap.Fields, {HOF: item.field}).IMS, StringValue: imsValue};
};

module.exports = superclass => class  extends superclass {
  configure(req, res, next) {
    const persons = req.sessionModel.get('persons');
    if (persons) {
      const additionalPeople = [];

      _.forEach(persons.aggregatedValues, i => {
        const person = new Array();
        i.fields.map(item => item.value !== '' ?
          person.push(transform(item)) : '');
        additionalPeople.push(person);
        req.sessionModel.set('persons', additionalPeople);
      });
    } else {
      req.sessionModel.unset('persons');
    }
    return super.configure(req, res, next);
  }
};
