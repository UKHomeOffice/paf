module.exports = superclass => class extends superclass {

  locals(req, res) {
    const locals = super.locals(req, res);
    const persons = req.sessionModel.get('persons').aggregatedValues;
    const personLimit = persons.length >= 6

    if (persons && personLimit) {
      locals.noMorePersons = true;
      return locals;
    }

    return locals;
  }
};
