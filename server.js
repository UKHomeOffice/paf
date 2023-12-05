'use strict';
/* eslint-disable no-undef */

const hof = require('hof');
let settings = require('./hof.settings');
const config = require('./config.js');
const mockAPIs = require('./mock-apis');
const bodyParser = require('busboy-body-parser');
const _ = require('lodash');

settings = Object.assign({}, settings, {
  routes: settings.routes.map(require),
  behaviours: settings.behaviours.map(require)
});

const app = hof(settings);

if (config.useMocks) {
  app.use(mockAPIs);
}

app.use((req, res, next) => {
  // Set HTML Language
  res.locals.htmlLang = 'en';
  // Set feedback link and phase banner
  res.locals.feedbackUrl = 'https://eforms.homeoffice.gov.uk/outreach/feedback.ofml';
  next();
});

if (config.env !== 'test') {
  app.use(bodyParser({limit: config.upload.maxFileSize}));
}

if (config.env === 'development' || config.env === 'test') {
  app.use('/test/bootstrap-session', (req, res) => {
    const appName = req.body.appName;

    if (!_.get(req, 'session[`hof-wizard-${appName}`]')) {
      if (!req.session) {
        throw new Error('Redis is not running!');
      }

      req.session[`hof-wizard-${appName}`] = {};
    }

    Object.keys(req.body.sessionProperties || {}).forEach(key => {
      req.session[`hof-wizard-${appName}`][key] = req.body.sessionProperties[key];
    });

    res.send('Session populate complete');
  });
}

module.exports = app;
