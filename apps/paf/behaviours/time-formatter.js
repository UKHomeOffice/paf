/* eslint-disable  max-len */
const _ = require('lodash');

module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    // preprend '0' if number is only a single digit
    const pad = num => num !== '' && num.length < 2 ? `0${num}` : num;

    if (req.sessionModel.get('time-crime-will-happen-hour')) {
      req.sessionModel.set('time-crime-will-happen-hour', pad(req.sessionModel.get('time-crime-will-happen-hour')));
    }
    if (req.sessionModel.get('time-crime-will-happen-minute')) {
      req.sessionModel.set('time-crime-will-happen-minute', pad(req.sessionModel.get('time-crime-will-happen-minute')));
    }
    // sets minutes to 00 if the hour field has been completed but the minute field left blank
    if (req.sessionModel.get('time-crime-will-happen-hour') && req.sessionModel.get('time-crime-will-happen-minute') === '') {
      req.sessionModel.set('time-crime-will-happen-minute', '00');
    }

    if (req.sessionModel.get('time-crime-will-happen-hour') && req.sessionModel.get('time-crime-will-happen-minute')) {
      const time = req.sessionModel.get('time-crime-will-happen-hour').concat(' : ', req.sessionModel.get('time-crime-will-happen-minute'));
      if (req.sessionModel.get('time-crime-will-happen-hour') < 12) {
        req.sessionModel.set('time-crime-will-happen', time + ' am');
      } else {
        req.sessionModel.set('time-crime-will-happen', time + ' pm');
      }
    } else {
      req.sessionModel.unset('time-crime-will-happen');
    }

    return super.configure(req, res, next);
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    // set change link for for time-crime-will-happen field
    if (locals.route === 'confirm') {
      _.forEach(locals.rows, fields => {
        locals.rows = locals.rows.map(row => {
          if (row.section === 'The Crime - Duration') {
            _.forEach(fields, sectionFields => {
              _.forEach(sectionFields, field => {
                if (field.field === 'time-crime-will-happen') {
                  field.changeLink = '/paf/date-time-crime-will-happen/edit#time-crime-will-happen-hour';
                }
              });
            });
            return row;
          }
          return row;
        });
      });
    }
    return locals;
  }
};
