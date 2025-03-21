'use strict';
/* eslint-disable max-len */
const saveImage = require('./behaviours/save-file');
const removeImage = require('./behaviours/remove-file');
const CombineAndLoopFields = require('hof').components.combineAndLoopFields;
const limitDocs = require('./behaviours/limit-documents');
const disableUpload = require('./behaviours/disable-file-upload');
const SummaryPageBehaviour = require('hof').components.summary;
const transportBehaviour = require('./behaviours/transport-behaviour');
const transportToggle = require('./behaviours/set-transport-toggle');
const Aggregate = require('./behaviours/aggregator');
const limitPerson = require('./behaviours/limit-person');
const personNumber = require('./behaviours/person-number');
const addressFormatter = require('./behaviours/address-formatter');
const additionalPersonFormatter = require('./behaviours/additional-person-formatter');
const vehicleToggleFormatter = require('./behaviours/vehicle-toggle-formatter');
const SendToSQS = require('./behaviours/send-to-sqs');
const UnsetCrimeCountry = require('./behaviours/unset-crime-country');
const timeFormatter = require('./behaviours/time-formatter');


module.exports = {
  name: 'paf',
  baseUrl: '/paf',
  params: '/:action?/:id?/:edit?',
  steps: {
    '/crime-type': {
      fields: ['crime-type',
        'immigration-crime-group',
        'smuggling-crime-group'
      ],
      backLink: '/start',
      next: '/crime-children'
    },
    '/crime-children': {
      fields: ['crime-children'],
      next: '/when-crime-happened'
    },
    '/when-crime-happened': {
      fields: ['when-crime-happened',
        'happening-now-info',
        'ongoing-info',
        'already-happened-info'
      ],
      next: '/crime-transport',
      forks: [{
        target: '/when-will-crime-happen',
        condition: {
          field: 'when-crime-happened',
          value: 'not-yet-happened'
        }
      }]
    },
    '/when-will-crime-happen': {
      fields: ['when-will-crime-happen'],
      next: '/crime-transport',
      forks: [{
        target: '/date-time-crime-will-happen',
        condition: {
          field: 'when-will-crime-happen',
          value: 'more-than-twenty-four-hours'
        }
      }]
    },
    '/date-time-crime-will-happen': {
      fields: ['date-crime-will-happen', 'time-crime-will-happen-hour', 'time-crime-will-happen-minute'],
      next: '/when-will-crime-happen-more-info'
    },
    '/when-will-crime-happen-more-info': {
      fields: ['when-will-crime-happen-more-info'],
      next: '/crime-transport'
    },
    '/crime-transport': {
      fields: ['crime-transport',
        'transport-group'
      ],
      behaviours: [transportBehaviour],
      next: '/crime-delivery',
      forks: [{
        target: '/crime-transport-vehicle-type',
        condition: req => {
          if (req.sessionModel.get('crime-transport') === 'yes'
            && req.sessionModel.get('transport-group').indexOf('crime-transport-vehicle') === 0) {
            return true;
          }
          return false;
        }
      },
      {
        target: '/crime-transport-boat-type',
        condition: req => {
          if (req.sessionModel.get('crime-transport') === 'yes'
            && req.sessionModel.get('transport-group').indexOf('crime-transport-boat') === 0) {
            return true;
          }
          return false;
        }
      },
      {
        target: '/crime-transport-train-details',
        condition: req => {
          if (req.sessionModel.get('crime-transport') === 'yes'
            && req.sessionModel.get('transport-group').indexOf('crime-transport-train') === 0) {
            return true;
          }
          return false;
        }
      },
      {
        target: '/crime-transport-aeroplane-details',
        condition: req => {
          if (req.sessionModel.get('crime-transport') === 'yes'
            && req.sessionModel.get('transport-group').indexOf('crime-transport-aeroplane') === 0) {
            return true;
          }
          return false;
        }
      }],
      continueOnEdit: true
    },
    '/crime-transport-vehicle-type': {
      behaviours: [transportToggle],
      fields: ['vehicle-type',
        'crime-car-group',
        'crime-hgv-group',
        'crime-lorry-group',
        'crime-van-group'
      ],
      next: '/crime-transport-vehicle-details',
      continueOnEdit: true
    },
    '/crime-transport-vehicle-details': {
      fields: ['vehicle-make',
        'vehicle-model',
        'vehicle-colour',
        'vehicle-registration'
      ],
      next: '/crime-delivery',
      forks: [{
        target: '/crime-transport-boat-type',
        condition: req => {
          if (req.sessionModel.get('crime-transport') === 'yes'
            && req.sessionModel.get('transport-group').indexOf('crime-transport-boat') === 1) {
            return true;
          }
          return false;
        }
      },
      {
        target: '/crime-transport-train-details',
        condition: req => {
          if (req.sessionModel.get('crime-transport') === 'yes'
            && req.sessionModel.get('transport-group').indexOf('crime-transport-train') === 1) {
            return true;
          }
          return false;
        }
      },
      {
        target: '/crime-transport-aeroplane-details',
        condition: req => {
          if (req.sessionModel.get('crime-transport') === 'yes'
            && req.sessionModel.get('transport-group').indexOf('crime-transport-aeroplane') === 1) {
            return true;
          }
          return false;
        }
      }],
      continueOnEdit: true
    },
    '/crime-transport-boat-type': {
      behaviours: [transportToggle],
      fields: ['boat-type',
        'crime-carrier-group',
        'crime-general-cargo-group',
        'crime-vessel-group'
      ],
      next: '/crime-transport-boat-details',
      continueOnEdit: true
    },
    '/crime-transport-boat-details': {
      fields: ['boat-name',
        'boat-country-departure',
        'port-departure',
        'port-arrival',
        'port-departure-time',
        'port-arrival-time'
      ],
      next: '/crime-delivery',
      forks: [
        {
          target: '/crime-transport-train-details',
          condition: req => {
            if (req.sessionModel.get('crime-transport') === 'yes'
              && req.sessionModel.get('transport-group').includes('crime-transport-train')) {
              return true;
            }
            return false;
          }
        },
        {
          target: '/crime-transport-aeroplane-details',
          condition: req => {
            if (req.sessionModel.get('crime-transport') === 'yes'
              && req.sessionModel.get('transport-group').includes('crime-transport-aeroplane')
              && !req.sessionModel.get('transport-group').includes('crime-transport-train')) {
              return true;
            }
            return false;
          }
        }],
      continueOnEdit: true
    },
    '/crime-transport-train-details': {
      fields: ['train-company',
        'train-country-departure',
        'station-departure',
        'station-arrival',
        'station-departure-time',
        'station-arrival-time'
      ],
      next: '/crime-delivery',
      forks: [
        {
          target: '/crime-transport-aeroplane-details',
          condition: req => {
            if (req.sessionModel.get('crime-transport') === 'yes'
              && req.sessionModel.get('transport-group').includes('crime-transport-aeroplane')) {
              return true;
            }
            return false;
          }
        }],
      continueOnEdit: true
    },
    '/crime-transport-aeroplane-details': {
      fields: ['airline-company',
        'airline-flight-number',
        'airline-country-departure',
        'airport-departure',
        'airport-arrival',
        'airport-departure-time',
        'airport-arrival-time'
      ],
      next: '/crime-delivery'
    },
    '/crime-delivery': {
      fields: ['crime-delivery', 'freight-more-info', 'express-more-info', 'post-more-info'],
      next: '/crime-location'
    },
    '/crime-location': {
      fields: ['crime-location',
        'crime-location-country',
        'crime-location-address-line1',
        'crime-location-address-line2',
        'crime-location-address-town',
        'crime-location-address-county',
        'crime-location-address-postcode',
        'crime-location-phone'],
      forks: [{
        target: '/crime-another-location',
        condition: {
          field: 'crime-location',
          value: 'yes'
        }
      }],
      behaviours: [UnsetCrimeCountry]
    },
    '/crime-another-location': {
      fields: ['crime-another-location',
        'crime-another-location-country',
        'crime-another-location-address-line1',
        'crime-another-location-address-line2',
        'crime-another-location-address-town',
        'crime-another-location-address-county',
        'crime-another-location-address-postcode',
        'crime-another-location-phone'
      ]
    },
    '/report-person': {
      fields: ['report-person'],
      forks: [{
        target: '/report-person-name',
        condition: {
          field: 'report-person',
          value: 'yes'
        }
      }]
    },
    '/report-person-name': {
      fields: ['report-person-first-name', 'report-person-family-name', 'report-person-nickname'],
      next: '/report-person-dob'
    },
    '/report-person-dob': {
      fields: ['report-person-dob'],
      next: '/report-person-age-range'
    },
    '/report-person-age-range': {
      fields: ['report-person-age-range'],
      next: '/report-person-nationality'
    },
    '/report-person-nationality': {
      fields: ['report-person-nationality'],
      next: '/report-person-place-of-birth'
    },
    '/report-person-place-of-birth': {
      fields: ['report-person-place-of-birth'],
      next: '/report-person-gender'
    },
    '/report-person-gender': {
      fields: ['report-person-gender'],
      next: '/report-person-id'
    },
    '/report-person-id': {
      fields: ['report-person-passport', 'report-person-id', 'report-person-ni'],
      next: '/report-person-location'
    },
    '/report-person-location': {
      fields: ['report-person-location'],
      next: '/report-person-occupation',
      forks: [{
        target: '/report-person-location-uk-address',
        condition: {
          field: 'report-person-location',
          value: 'uk'
        }
      },
      {
        target: '/report-person-location-outside-uk-address',
        condition: {
          field: 'report-person-location',
          value: 'outside-uk'
        }
      },
      {
        target: '/report-person-location-travel-to-uk',
        condition: {
          field: 'report-person-location',
          value: 'travel-to-uk'
        }
      }]
    },
    '/report-person-location-uk-address': {
      fields: ['report-person-location-uk-address-line1',
        'report-person-location-uk-address-line2',
        'report-person-location-uk-address-town',
        'report-person-location-uk-address-county',
        'report-person-location-uk-address-postcode'
      ],
      next: '/report-person-location-type'
    },
    '/report-person-location-type': {
      fields: ['report-person-location-type'],
      next: '/report-person-location-contact'
    },
    '/report-person-location-contact': {
      fields: [
        'report-person-location-mobile',
        'report-person-location-phone',
        'report-person-location-email'
      ],
      next: '/report-person-occupation'
    },
    '/report-person-location-outside-uk-address': {
      fields: ['report-person-location-outside-uk-address-country',
        'report-person-location-outside-uk-address-line1',
        'report-person-location-outside-uk-address-line2',
        'report-person-location-outside-uk-address-town',
        'report-person-location-outside-uk-address-county',
        'report-person-location-outside-uk-address-postcode'
      ],
      next: '/report-person-location-outside-uk-type'
    },

    '/report-person-location-outside-uk-type': {
      fields: ['report-person-location-outside-uk-type'],
      next: '/report-person-location-outside-uk-contact'
    },
    '/report-person-location-outside-uk-contact': {
      fields: [
        'report-person-location-outside-uk-mobile',
        'report-person-location-outside-uk-phone',
        'report-person-location-outside-uk-email'
      ],
      next: '/report-person-occupation'
    },
    '/report-person-location-travel-to-uk': {
      fields: ['report-person-location-travel-to-uk-country',
        'report-person-location-travel-to-uk-how',
        'report-person-location-travel-to-uk-where'],
      next: '/report-person-occupation'
    },
    '/report-person-occupation': {
      fields: ['report-person-occupation'],
      next: '/report-person-study',
      forks: [{
        target: '/report-person-occupation-type',
        condition: {
          field: 'report-person-occupation',
          value: 'yes'
        }
      }
      ]
    },
    '/report-person-occupation-type': {
      fields: ['report-person-occupation-type'],
      next: '/report-person-occupation-hours',
      forks: [{
        target: '/report-person-occupation-government-employee',
        condition: {
          field: 'report-person-occupation-type',
          value: 'job-government-employee'
        }
      },
      {
        target: '/report-person-occupation-other',
        condition: {
          field: 'report-person-occupation-type',
          value: 'job-other'
        }
      }
      ]
    },
    '/report-person-occupation-government-employee': {
      fields: ['report-person-occupation-government-employee'],
      next: '/report-person-occupation-hours',
      forks: [{
        target: '/report-person-occupation-government-dept',
        condition: {
          field: 'report-person-occupation-government-employee',
          value: 'yes'
        }
      }
      ]
    },
    '/report-person-occupation-government-dept': {
      fields: ['report-person-occupation-government-dept', 'government-dept-other'],
      next: '/report-person-occupation-hours'
    },
    '/report-person-occupation-other': {
      fields: ['report-person-occupation-other'],
      next: '/report-person-occupation-hours'
    },
    '/report-person-occupation-hours': {
      fields: ['report-person-occupation-hours'],
      next: '/report-person-occupation-days'
    },
    '/report-person-occupation-days': {
      fields: ['report-person-occupation-days'],
      next: '/report-person-occupation-where'
    },
    '/report-person-occupation-where': {
      next: '/report-person-study',
      fields: ['report-person-occupation-where'],
      forks: [{
        target: '/report-person-occupation-company-name',
        condition: {
          field: 'report-person-occupation-where',
          value: 'yes'
        }
      }
      ],
      continueOnEdit: true
    },
    '/report-person-occupation-company-name': {
      fields: ['report-person-occupation-company-name'],
      next: '/report-person-occupation-company-address'
    },
    '/report-person-occupation-company-address': {
      fields: ['report-person-occupation-company-address-line1',
        'report-person-occupation-company-address-line2',
        'report-person-occupation-company-address-town',
        'report-person-occupation-company-address-county',
        'report-person-occupation-company-address-postcode',
        'report-person-occupation-company-phone'
      ],
      next: '/report-person-occupation-company-manager'
    },
    '/report-person-occupation-company-manager': {
      fields: ['report-person-occupation-company-manager', 'report-person-occupation-company-manager-know'],
      next: '/report-person-study'
    },
    '/report-person-study': {
      fields: ['report-person-study'],
      next: '/report-person-transport',
      forks: [{
        target: '/report-person-study-subject',
        condition: {
          field: 'report-person-study',
          value: 'yes'
        }
      }
      ]
    },
    '/report-person-study-subject': {
      fields: ['report-person-study-subject'],
      next: '/report-person-study-location'
    },
    '/report-person-study-location': {
      fields: ['report-person-study-location'],
      next: '/report-person-transport',
      forks: [{
        target: '/report-person-study-hours',
        condition: {
          field: 'report-person-study-location',
          value: 'yes'
        }
      }
      ]
    },
    '/report-person-study-hours': {
      fields: ['report-person-study-hours'],
      next: '/report-person-study-days'
    },
    '/report-person-study-days': {
      fields: ['report-person-study-days'],
      next: '/report-person-study-where'
    },
    '/report-person-study-where': {
      fields: ['report-person-study-where'],
      next: '/report-person-transport',
      forks: [{
        target: '/report-person-study-name',
        condition: {
          field: 'report-person-study-where',
          value: 'yes'
        }
      }
      ]
    },
    '/report-person-study-name': {
      fields: ['report-person-study-name'],
      next: '/report-person-study-address'
    },
    '/report-person-study-address': {
      fields: ['report-person-study-address-line1',
        'report-person-study-address-line2',
        'report-person-study-address-town',
        'report-person-study-address-county',
        'report-person-study-address-postcode'
      ],
      next: '/report-person-study-contact'
    },
    '/report-person-study-contact': {
      fields: ['report-person-study-phone',
        'report-person-study-email',
        'report-person-study-url'
      ],
      next: '/report-person-study-manager'
    },
    '/report-person-study-manager': {
      fields: ['report-person-study-manager', 'report-person-study-manager-know'],
      next: '/report-person-transport'
    },
    '/report-person-transport': {
      fields: ['report-person-transport'],
      next: '/report-person-description',
      forks: [{
        target: '/report-person-transport-type',
        condition: {
          field: 'report-person-transport',
          value: 'yes'
        }
      }
      ]
    },
    '/report-person-transport-type': {
      behaviours: [transportToggle],
      fields: ['report-person-transport-type',
        'report-person-transport-car-group',
        'report-person-transport-hgv-group',
        'report-person-transport-lorry-group',
        'report-person-transport-van-group'],
      next: '/report-person-transport-details'
    },
    '/report-person-transport-details': {
      fields: [
        'report-person-transport-make',
        'report-person-transport-model',
        'report-person-transport-colour',
        'report-person-transport-registration',
        'report-person-transport-other'],
      next: '/report-person-description'
    },
    '/report-person-description': {
      fields: ['report-person-description'],
      next: '/has-additionalPerson'
    },
    '/has-additionalPerson': {
      fields: ['hasAdditionalPerson'],
      forks: [{
        target: '/person-details',
        condition: {
          field: 'hasAdditionalPerson',
          value: 'yes'
        }
      }],
      continueOnEdit: true
    },
    '/add-person': {
      backLink: 'has-additionalPerson',
      fields: [
        'personAddNumber',
        'personAddFirstName',
        'personAddFamilyName',
        'personAddNickname'
      ],
      continueOnEdit: true,
      next: '/add-person-dob'
    },
    '/add-person-dob': {
      backLink: 'add-person',
      fields: ['personAddDob'],
      continueOnEdit: true,
      next: '/add-person-age'
    },
    '/add-person-age': {
      backLink: 'add-person-dob',
      fields: ['personAddAgeRange'],
      continueOnEdit: true,
      next: '/add-person-nationality'
    },
    '/add-person-nationality': {
      backLink: 'add-person-age',
      fields: ['personAddNationality'],
      continueOnEdit: true,
      next: '/add-person-gender'
    },
    '/add-person-gender': {
      backLink: 'add-person-nationality',
      fields: ['personAddGender'],
      continueOnEdit: true,
      next: '/add-person-identity'
    },
    '/add-person-identity': {
      backLink: 'add-person-gender',
      fields: ['personAddPassport', 'personAddId', 'personAddNi'],
      continueOnEdit: true,
      next: '/person-details'
    },
    '/person-details': {
      backLink: 'has-additionalPerson',
      behaviours: [Aggregate, limitPerson, personNumber],
      aggregateTo: 'persons',
      aggregateFrom: [
        'personAddNumber',
        'personAddFirstName',
        'personAddFamilyName',
        'personAddNickname',
        'personAddDob',
        'personAddAgeRange',
        'personAddNationality',
        'personAddGender',
        'personAddPassport',
        'personAddId',
        'personAddNi'
      ],
      titleField: 'personAddNumber',
      addStep: ['add-person'],
      addAnotherLinkText: 'person',
      template: 'add-another',
      continueOnEdit: true
    },
    '/report-organisation': {
      fields: ['report-organisation'],
      forks: [{
        target: '/company-name',
        condition: {
          field: 'report-organisation',
          value: 'yes'
        }
      }]
    },
    '/company-name': {
      next: '/company-address',
      fields: ['organisation-company-name']
    },
    '/company-address': {
      fields: ['company-address-line1', 'company-address-line2', 'company-town', 'company-county', 'company-postcode'],
      next: '/company-contact'
    },
    '/company-contact': {
      fields: ['company-phone', 'company-email', 'company-website'],
      next: '/company-types'
    },
    '/company-types': {
      fields: ['company-types'],
      next: '/company-owner'
    },
    '/company-owner': {
      fields: ['company-owner', 'owner-know-about-the-crime'],
      next: '/company-other-info'
    },
    '/company-other-info': {
      fields: ['company-other-info'],
      next: '/another-company'
    },
    '/another-company': {
      fields: ['another-company', 'another-company-yes']
    },
    '/other-info-description': {
      fields: ['other-info-description'],
      next: '/other-info-another-crime'
    },
    '/other-info-another-crime': {
      fields: ['other-info-another-crime', 'other-info-another-crime-description'],
      next: '/other-info-file-upload'
    },
    '/other-info-file-upload': {
      behaviours: [saveImage('other-info-file-upload'), disableUpload],
      fields: ['other-info-file-upload'],
      continueOnEdit: true,
      forks: [{
        target: '/add-other-info-file-upload',
        condition: req => {
          if (req.form.values['other-info-file-upload']) {
            return true;
          }
          return false;
        }
      }]
    },
    '/add-other-info-file-upload': {
      template: 'list-add-looped-files',
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
      locals: {
        section: 'other-info-file-upload'
      }
    },
    '/about-you': {
      fields: ['how-did-you-find-out-about-the-crime'],
      next: '/does-anyone-else-know'
    },
    '/does-anyone-else-know': {
      fields: ['does-anyone-else-know'],
      next: '/have-you-reported-before'
    },
    '/have-you-reported-before': {
      fields: ['have-you-reported-before'],
      next: '/how-do-you-know-the-person'
    },
    '/how-do-you-know-the-person': {
      fields: ['how-do-you-know-the-person'],
      next: '/can-use-info-without-risk'
    },
    '/can-use-info-without-risk': {
      fields: ['can-use-info-without-risk'],
      next: '/about-you-details'
    },
    '/about-you-details': {
      fields: [
        'about-you-first-name',
        'about-you-family-name'
      ],
      next: '/about-you-dob'
    },
    '/about-you-dob': {
      fields: ['about-you-dob'],
      next: '/about-you-nationality'
    },
    '/about-you-nationality': {
      fields: ['about-you-nationality'],
      next: '/about-you-gender'
    },
    '/about-you-gender': {
      fields: ['about-you-gender'],
      next: '/about-you-contact'
    },
    '/about-you-contact': {
      fields: ['about-you-contact'],
      forks: [{
        target: '/are-you-eighteen',
        condition: {
          field: 'about-you-contact',
          value: 'yes'
        }
      }]
    },
    '/are-you-eighteen': {
      fields: ['are-you-eighteen', 'contact-number', 'when-to-contact']
    },
    '/confirm': {
      behaviours: [SummaryPageBehaviour, personNumber, timeFormatter],
      sections: require('./sections/summary-data-sections'),
      next: '/declaration'
    },
    '/declaration': {

      behaviours: ['complete', addressFormatter, additionalPersonFormatter,
        vehicleToggleFormatter, SendToSQS],

      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    },
    '/exit': {}
  }
};
