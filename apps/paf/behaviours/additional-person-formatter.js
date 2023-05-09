const _ = require("lodash");
module.exports = superclass => class  extends superclass {
  configure(req, res, next) {
    const persons = req.sessionModel.get('persons')
    if (persons) {
      _.forEach(persons.aggregatedValues, (i) => {
        const additionalPeople = i.fields.map(item => (item.value));
        
        // Remove person number value as this is not relevant for IMS
        additionalPeople.splice(0,1);

        req.sessionModel.set('additional-people-table', 'Person Added IS =' + additionalPeople.join(', '));
      })
    } 
    else {
      req.sessionModel.unset('additional-people-table')
    }
    return super.configure(req, res, next);
  }
};
