module.exports = superclass => class extends superclass {
  configure(req, res, next) {

    // preprend '0' if number is only a single digit
    const pad = num => num !== '' && num.length < 2 ? `0${num}` : num;
    if (req.sessionModel.get('time-crime-will-happen-hour')) {
      req.sessionModel.set('time-crime-will-happen-hour', pad(req.sessionModel.get('time-crime-will-happen-hour')))
    }
    if (req.sessionModel.get('time-crime-will-happen-minute')) {
      req.sessionModel.set('time-crime-will-happen-minute', pad(req.sessionModel.get('time-crime-will-happen-minute')))
    }

    if (req.sessionModel.get('time-crime-will-happen-hour') && req.sessionModel.get('time-crime-will-happen-minute')) {
      let time = req.sessionModel.get('time-crime-will-happen-hour').concat(" : ", req.sessionModel.get('time-crime-will-happen-minute'));
      if (req.sessionModel.get('time-crime-will-happen-hour') < 12) {
        req.sessionModel.set('time-crime-will-happen', time + ' am');
      } else {
        req.sessionModel.set('time-crime-will-happen', time + ' pm');
      }
    } else {
      req.sessionModel.unset('time-crime-will-happen')
    }

    return super.configure(req, res, next);
  }
};
