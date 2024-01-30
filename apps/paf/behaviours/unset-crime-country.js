'use strict';


module.exports = superclass => class extends superclass {
  getValues(req) {
    req.sessionModel.unset('crime-location-country');
    req.sessionModel.unset('crime-another-location-country');
    return super.getValues.apply(this, arguments);
  }
};
