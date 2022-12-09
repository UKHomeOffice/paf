'use strict';

const SummaryPageBehaviour = require('hof').components.summary;
const Aggregate = require('./behaviours/aggregator');
const limitPerson = require('./behaviours/limit-person');
const personNumber = require('./behaviours/person-number');

module.exports = {
  name: 'paf',
  baseUrl: '/paf',
  params: '/:action?/:id?/:edit?',
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
      fields: ['report-person'],
      next: '/report-organisation',
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
        target: '/report-person-location-uk-contact-details',
        condition: {
          field: 'report-person-location',
          value: 'uk'
        }
      },
      {
        target: '/report-person-location-outside-uk-contact-details',
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
    '/report-person-location-uk-contact-details': {
      fields: ['report-person-location-uk-contact-details-building',
        'report-person-location-uk-contact-details-street',
        'report-person-location-uk-contact-details-townOrCity',
        'report-person-location-uk-contact-details-county',
        'report-person-location-uk-contact-details-postcodeOrZIPCode'
      ],
      next: '/report-person-location-type'
    },
    '/report-person-location-outside-uk-contact-details': {
      fields: ['report-person-location-outside-uk-contact-details-country',
        'report-person-location-outside-uk-contact-details-building',
        'report-person-location-outside-uk-contact-details-street',
        'report-person-location-outside-uk-contact-details-townOrCity',
        'report-person-location-outside-uk-contact-details-county',
        'report-person-location-outside-uk-contact-details-postcodeOrZIPCode'
      ],
      next: '/report-person-location-type'
    },
    '/report-person-location-type': {
      fields: ['report-person-location-type'],
      next: '/report-person-location-contact-details'
    },
    '/report-person-location-contact-details': {
      fields: [
        'report-person-location-mobile',
        'report-person-location-phone',
        'report-person-location-email'
      ],
      next: '/report-person-occupation'
    },
    '/report-person-location-travel-to-uk': {
      fields: ['report-person-location-travel-to-uk-country', 'report-person-location-travel-to-uk-how', 'report-person-location-travel-to-uk-where'],
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
      },
      ]
    },
    '/report-person-occupation-type': {
      fields: ['report-person-occupation-type'],
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
      ]
    },
    '/report-person-occupation-company-name': {
      fields: ['report-person-occupation-company-name'],
      next: '/report-person-occupation-company-contact-details'
    },
    '/report-person-occupation-company-contact-details': {
      fields: ['report-person-occupation-company-contact-details-building',
        'report-person-occupation-company-contact-details-street',
        'report-person-occupation-company-contact-details-townOrCity',
        'report-person-occupation-company-contact-details-county',
        'report-person-occupation-company-contact-details-postcodeOrZIPCode',
        'report-person-occupation-company-phone'
      ],
      next: '/report-person-occupation-company-manager'
    },
    '/report-person-occupation-company-manager': {
      fields: ['report-person-occupation-company-manager'],
      next: '/report-person-occupation-company-manager-know'
    },
    '/report-person-occupation-company-manager-know': {
      fields: ['report-person-occupation-company-manager-know'],
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
      next: '/report-person-study-contact-details'
    },
    '/report-person-study-contact-details': {
      fields: ['report-person-study-contact-details-building',
        'report-person-study-contact-details-street',
        'report-person-study-contact-details-townOrCity',
        'report-person-study-contact-details-county',
        'report-person-study-contact-details-postcodeOrZIPCode',
        'report-person-study-phone',
        'report-person-study-email',
        'report-person-study-url'
      ],
      next: '/report-person-study-manager'
    },
    '/report-person-study-manager': {
      fields: ['report-person-study-manager'],
      next: '/report-person-study-manager-know'
    },
    '/report-person-study-manager-know': {
      fields: ['report-person-study-manager-know'],
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
      fields: ['report-person-transport-type'],
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
      next: '/report-organisation',
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
      next: '/add-person-place-of-birth'
    },
    '/add-person-place-of-birth': {
      backLink: 'add-person-nationality',
      fields: ['personAddPlaceOfBirth'],
      continueOnEdit: true,
      next: '/add-person-gender'
    },
    '/add-person-gender': {
      backLink: 'add-person-place-of-birth',
      fields: ['personAddGender'],
      continueOnEdit: true,
      next: '/add-person-identity'
    },
    '/add-person-identity': {
      backLink: 'add-person-gender',
      fields: ['personAddPassport', 'personAddId','personAddNi'],
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
        'personAddPlaceOfBirth',
        'personAddGender',
        'personAddPassport',
        'personAddId',
        'personAddNi'
      ],
      titleField: 'personAddNumber',
      addStep: ['add-person'],
      addAnotherLinkText: 'person',
      template: 'add-another',
      next: '/report-organisation',
      continueOnEdit: true
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
      behaviours: [SummaryPageBehaviour, 'complete', personNumber],
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
