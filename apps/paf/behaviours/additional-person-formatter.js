const _ = require('lodash');
module.exports = superclass => class  extends superclass {
  configure(req, res, next) {
    const persons = req.sessionModel.get('persons');
    if (persons) {
      const additionalPeople = [];

      _.forEach(persons.aggregatedValues, i => {
        console.log('Person :: ', i);
        const peopleValue = i.fields.map(item => item.value !== '' ?
          (item.field + ':' + item.value) : '');
        // Remove person number value as this is not relevant for IMS
        peopleValue.splice(0, 1);
        const peopleValueFiltered = peopleValue.filter(entry => entry != '');

        additionalPeople.push('Person Added IS =' + peopleValueFiltered.join(', '));

        req.sessionModel.set('additional-people-table', additionalPeople);
      });
    } else {
      req.sessionModel.unset('additional-people-table');
    }
    return super.configure(req, res, next);
  }
};
