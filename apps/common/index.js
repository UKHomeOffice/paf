'use strict';

module.exports = {
  name: 'common',
  pages: {
    '/accessibility': 'accessibility'
  },
  steps: {
    '/start': {
      template: 'start',
      next: 'paf/crime-type'
    },
    '/session-timeout': {},
    '/exit': {}
  }
};
