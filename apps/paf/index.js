'use strict';

module.exports = {
  name: 'paf',
  steps: {
    '/': {
      template: 'start',
      next: '/crime-type'
    },
    '/crime-type': {
      next: '/crime-children'
    },
    '/crime-children': {
      next: '/when-crime-happened'
    },
    '/when-crime-happened': {
      next: '/crime-transport'
    },
    '/crime-transport': {
      next: '/crime-delivery'
    },
    '/crime-delivery': {
      next: '/crime-location'
    },
    '/crime-location': {
      next: '/report-person'
    },
    '/report-person': {
      next: '/report-organisation',
    },
    '/report-organisation': {
      next: '/other-info-description',
    },
    '/other-info-description': {
      next: '/other-info-another-crime'
    },
    '/other-info-another-crime': {
      next: '/other-info-file-upload'
    },
    '/other-info-file-upload': {
      next: '/about-you'
    },
    '/about-you': {
      next: '/confirm'
    },

    '/confirm': {
      next: '/declaration'
    },
    '/declaration': {
      next: '/confirmation'
    },
    '/confirmation': {
      template: 'confirmation'
    }
  }
};
