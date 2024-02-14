const _ = require('lodash');
const fieldsMap = require('../../../lib/ims-hof-fields-map.json');

const anotherPersonMap = require('../../../lib/ims-hof-anotherperson-map.json');
const valuesMap = require('../../../lib/ims-hof-values-map.json');

const getFirstAdditionalPerson = persons => {
  const anotherPerson = new Array();
  _.forEach(persons.aggregatedValues[0].fields, i => {
    const imsName = _.find(anotherPersonMap.Fields, {HOF: i.field});
    if ( imsName !== undefined) {
      const imsValue = _.find(valuesMap.Values, {HOF: i.value});
      if (imsValue !== undefined ) {
        anotherPerson.push({FieldName: imsName.IMS, FieldValue: imsValue.IMS});
      } else {
        anotherPerson.push({FieldName: imsName.IMS, FieldValue: i.value});
      }
    }
  });
  return anotherPerson;
};

module.exports = superclass => class  extends superclass {
  configure(req, res, next) {
    const persons = req.sessionModel.get('persons');
    if (persons) {

      if ( persons.aggregatedValues) {
        const additionalPeople = [];

        const anotherPerson = getFirstAdditionalPerson(persons);

        additionalPeople.push(anotherPerson);
        req.sessionModel.set('persons', additionalPeople);

        if (persons.aggregatedValues.length > 1) {
          _.forEach(persons.aggregatedValues.splice(1), i => {
            console.log('Person :: ', i);
            const person = new Array();
            i.fields.map(item => item.value !== '' ?
              person.push({Key: _.find(fieldsMap.Fields, {HOF: item.field}).IMS,
                StringValue: item.value}) : '');

            additionalPeople.push(person);

            req.sessionModel.set('persons', additionalPeople);
          });
        }
      }
    } else {
      req.sessionModel.unset('persons');
    }
    return super.configure(req, res, next);
  }
};