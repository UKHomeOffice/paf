'use strict';
const saveImage = require('./behaviours/save-file');
const removeImage = require('./behaviours/remove-file');
const CombineAndLoopFields = require('hof').components.combineAndLoopFields;
const limitDocs = require('./behaviours/limit-documents');
const disableUpload = require('./behaviours/disable-file-upload');
const SummaryPageBehaviour = require('hof').components.summary;

module.exports = {
  name: 'paf',
  baseUrl: '/paf',
  steps: {
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
      behaviours: [saveImage('other-info-file-upload'), disableUpload],
      fields: ['other-info-file-upload'],
      continueOnEdit: true,
      next: '/add-other-info-file-upload'
    },
    '/add-other-info-file-upload': {
      template: 'list-add-looped-items',
      behaviours: [CombineAndLoopFields({
        groupName: 'other-info-file-uploads',
        fieldsToGroup: [
          'other-info-file-upload'
        ],
        groupOptional: true,
        removePrefix: 'other-',
        combineValuesToSingleField: 'record',
        returnTo: '/other-info-file-upload'
      }), removeImage, limitDocs],
      next: '/about-you',
      locals: {
        section: 'other-info-file-upload'
      }
    },
    '/about-you': {
      next: '/confirm'
    },

    '/confirm': {
      behaviours: [SummaryPageBehaviour, 'complete'],
      sections: require('./sections/summary-data-sections'),
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
