'use strict';

module.exports = {
  name: 'common',
  steps: {
    '/start': {
      template: 'start',
      next: 'paf/crime-type'
    }
  }
};
