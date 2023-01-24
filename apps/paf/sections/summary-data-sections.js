'use strict';

const moment = require('moment');
const PRETTY_DATE_FORMAT = 'Do MMMM YYYY';
const OCCUPATION = require('../data/occupation');
const _ = require('lodash');

module.exports = {
  crime: [
    'crime-type'
  ],
  person: [
    'report-person',
  ],
  personalDetails: [
    'report-person-first-name',
    'report-person-family-name',
    'report-person-nickname',
    {
      field: 'report-person-dob',
      parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
    },
    'report-person-age-range',
    'report-person-nationality',
    'report-person-place-of-birth',
    'report-person-gender',
  ],
  personId: [
    'report-person-passport',
    'report-person-id',
    'report-person-ni',
  ],
  personLocation: [
    'report-person-location-uk-contact-details-building',
    'report-person-location-uk-contact-details-street',
    'report-person-location-uk-contact-details-townOrCity',
    'report-person-location-uk-contact-details-county',
    'report-person-location-uk-contact-details-postcodeOrZIPCode',
    'report-person-location-outside-uk-contact-details-country',
    'report-person-location-outside-uk-contact-details-building',
    'report-person-location-outside-uk-contact-details-street',
    'report-person-location-outside-uk-contact-details-townOrCity',
    'report-person-location-outside-uk-contact-details-county',
    'report-person-location-outside-uk-contact-details-postcodeOrZIPCode',
    'report-person-location-mobile',
    'report-person-location-phone',
    'report-person-location-email',
    'report-person-location-type',
    'report-person-location-travel-to-uk-country'
  ],
  personOccupation: [
    'report-person-occupation',
    {
    field: 'report-person-occupation-type',
      parse: v => _.get(_.find(OCCUPATION, group => group.value === v), 'label', '')
    },
    'report-person-occupation-hours',
    'report-person-occupation-days',
    'report-person-occupation-where',
    'report-person-occupation-company-name',
    'report-person-occupation-company-contact-details-building',
    'report-person-occupation-company-contact-details-street',
    'report-person-occupation-company-contact-details-townOrCity',
    'report-person-occupation-company-contact-details-county',
    'report-person-occupation-company-contact-details-postcodeOrZIPCode',
    'report-person-occupation-company-phone',
    'report-person-occupation-company-manager',
    'report-person-occupation-company-manager-know'
  ],
  personStudy: [
    'report-person-study',
    'report-person-study-subject',
    'report-person-study-location',
    'report-person-study-hours',
    'report-person-study-days',
    'report-person-study-where',
    'report-person-study-name',
    'report-person-study-contact-details-building',
    'report-person-study-contact-details-street',
    'report-person-study-contact-details-townOrCity',
    'report-person-study-contact-details-county',
    'report-person-study-contact-details-postcodeOrZIPCode',
    'report-person-study-phone',
    'report-person-study-email',
    'report-person-study-url',
    'report-person-study-manager',
    'report-person-study-manager-know',
  ],
  personTransport: [
    'report-person-transport',
    'report-person-transport-type',
    'report-person-transport-make',
    'report-person-transport-model',
    'report-person-transport-colour',
    'report-person-transport-registration',
    'report-person-transport-other',
  ],
  personDescription: [
    'report-person-description'
  ],
  'person-details': [
    {
      step: '/person-details',
      field: 'persons',
      addElementSeparators: true,
      dependsOn: 'hasAdditionalPerson'
    }
  ],
  organisation: [
    'report-organisation'
  ],
  otherInfo: [
    'other-info-file-upload',
    {
      step: '/add-other-info-file-upload',
      field: 'other-info-file-upload'
    }
  ],
  aboutYou: [

  ]
};
