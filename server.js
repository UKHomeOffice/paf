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

app.use((req, res, next) => {
  if (req.is('multipart/form-data')) {
    let bb;
    try {
      bb = busboy({
        headers: req.headers,
        limits: {
          fileSize: bytes('10mb')
        }
      });
    } catch (err) {
      return next(err);
    }

    bb.on('field', function (key, value) {
      req.body[key] = value;
    });

    bb.on('file', function (key, file, fileInfo) {
      file.pipe(bl(function (err, d) {
        if (err || !(d.length || fileInfo.filename)) {
          return;
        }
        const fileData = {
          data: file.truncated ? null : d,
          name: fileInfo.filename || null,
          encoding: fileInfo.encoding,
          mimetype: fileInfo.mimeType,
          truncated: file.truncated,
          size: file.truncated ? null : Buffer.byteLength(d, 'binary')
        };

        if (settings.multi) {
          req.files[key] = req.files[key] || [];
          req.files[key].push(fileData);
        } else {
          req.files[key] = fileData;
        }
      }));
    });

    let error;

    bb.on('error', function (err) {
      error = err;
      next(err);
    });

    bb.on('finish', function () {
      if (error) {
        return;
      }
      next();
    });
    req.files = req.files || {};
    req.body = req.body || {};
    req.pipe(bb);
  } else {
    next();
  }
});

async function updateCases() {
  try {
    const cases = new Cases(s3Id);
    await cases.fetch();
    await cases.processToJsonFile();
  } catch (e) {
    logger.log('error', e);
  }
}

updateCases();

if (config.casesIds.cronEnabled) {
  cron.schedule('0 0 * * *', async () => {
    logger.log('info', 'updating local cases sheet...');
    updateCases();
  });
}

console.log('*******WARNING: The data folder SHOULD NOT be deployed to production. Please ensure the data folder has not been pushed to Github and is added to the .gitignore file before deployment to production.******* \n');

module.exports = app;
