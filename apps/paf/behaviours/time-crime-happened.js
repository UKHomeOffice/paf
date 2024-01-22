'use strict';

const _ = require('lodash');

module.exports = superclass => class extends superclass {
  
  saveValues(req, res, next) {
    const hour = req.form.values['time-crime-will-happen-hour'];
    const minute = req.form.values['time-crime-will-happen-minutes'];

    req.sessionModel.set('time-crime-will-happen',`${hour}:${minute}`)

    return super.saveValues(req,res,next);
  }
};
