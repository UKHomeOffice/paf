const _ = require('lodash');
const fieldsMap = require('../../../lib/ims-hof-fields-map.json');

module.exports = superclass => class  extends superclass {
  configure(req, res, next) {
    const persons = req.sessionModel.get('persons');
    if (persons) {
      const additionalPeople = [];

      _.forEach(persons.aggregatedValues, i => {
        const person = new Array();
        i.fields.map(item => item.value !== '' ?
          person.push({Key: _.find(fieldsMap.Fields, {HOF: item.field}).IMS,
            StringValue: item.value}) : '');

        additionalPeople.push(person);

        req.sessionModel.set('persons', additionalPeople);
      });
    } else {
      req.sessionModel.unset('persons');
    }
    return super.configure(req, res, next);
  }
};
