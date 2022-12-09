module.exports = superclass => class extends superclass {

  locals(req, res) {
    const locals = super.locals(req, res);
    const persons = req.sessionModel.get('persons').aggregatedValues;

    if (persons && persons.length >= 6) {
      locals.noMorePersons = true;
      return locals;
    }

    return locals;
  }
};
