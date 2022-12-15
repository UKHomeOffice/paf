'use strict';

module.exports = {
  name: 'common',
  steps: {
    '/': {
      template: 'start',
      next: 'paf/crime-type'
    }
  }
};
