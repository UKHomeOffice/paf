'use strict';

const moment = require('moment');
const PRETTY_DATE_FORMAT = 'Do MMMM YYYY';
const _ = require('lodash');

module.exports = {
  crime: [
  ],
  person: [
  ],
  organisation: [
  ],
  otherInfo: [
    'other-info-file-upload',
    {
      step: '/add-other-info-file-upload',
      field: 'images',
      parse: (list, req) => {
        if (!req.sessionModel.get('steps').includes('/add-other-info-file-upload')) {
          return null;
        }
        return list && list.map(a => a.name).join('\n————————————————\n') || 'None';
      }
    },
  ],
  aboutYou: [

  ]
};
