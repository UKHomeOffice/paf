'use strict';

const moment = require('moment');
const PRETTY_DATE_FORMAT = 'Do MMMM YYYY';
const OCCUPATION = require('../data/occupation');
const _ = require('lodash');

module.exports = {
  'crime-type': [
    'crime-type',
    'immigration-crime-group',
    'smuggling-crime-group',
  ],
  'crime-children': [
    'crime-children',
  ],
  'crime-time': [
    'when-crime-happened',
    'happening-now-info',
    'ongoing-info',
    'already-happened-info',
    'when-will-crime-happen',
    {
      field: 'date-crime-will-happen',
      parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
    },
    'time-crime-will-happen',
    'when-will-crime-happen-more-info',
  ],
  'crime-transport': [
    'crime-transport',
    'transport-group',
    'vehicle-type',
    'crime-car-group',
    'crime-hgv-group',
    'crime-lorry-group',
    'crime-van-group',
    'vehicle-make',
    'vehicle-model',
    'vehicle-colour',
    'vehicle-registration',
    'boat-type',
    'crime-carrier-group',
    'crime-general-cargo-group',
    'crime-vessel-group',
    'boat-name',
    'boat-country-departure',
    'port-departure',
    'port-arrival',
    'port-departure-time',
    'port-arrival-time',
    'train-company',
    'train-country-departure',
    'station-departure',
    'station-arrival',
    'station-departure-time',
    'station-arrival-time',
    'airline-company',
    'airline-flight-number',
    'airline-country-departure',
    'airport-departure',
    'airport-arrival',
    'airport-departure-time',
    'airport-arrival-time',
  ],
  'crime-delivery': [
    'crime-delivery',
    'freight-more-info',
    'express-more-info',
    'post-more-info',
  ],
  'crime-location': [
    'crime-location',
    'crime-location-country',
    'crime-location-address-building',
    'crime-location-address-street',
    'crime-location-address-townOrCity',
    'crime-location-address-county',
    'crime-location-address-postcodeOrZIPCode',
    'crime-location-phone',
    'crime-another-location',
    'crime-another-location-country',
    'crime-another-location-address-building',
    'crime-another-location-address-street',
    'crime-another-location-address-townOrCity',
    'crime-another-location-address-county',
    'crime-another-location-address-postcodeOrZIPCode',
    'crime-another-location-phone'
  ],
  person: [
    'report-person',
  ],
  'personal-details': [
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
  'person-id': [
    'report-person-passport',
    'report-person-id',
    'report-person-ni',
  ],
  'person-location': [
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
  'person-occupation': [
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
  'person-study': [
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
  'person-transport': [
    'report-person-transport',
    'report-person-transport-type',
    'report-person-transport-car-group',
    'report-person-transport-hgv-group',
    'report-person-transport-lorry-group',
    'report-person-transport-van-group',
    'report-person-transport-make',
    'report-person-transport-model',
    'report-person-transport-colour',
    'report-person-transport-registration',
    'report-person-transport-other',
  ],
  'person-description': [
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
    'report-organisation',
    'organisation-company-name',
    'company-types',
    'company-owner',
    'owner-know-about-the-crime'
  ],
  'organisation-contact': [
    'company-address-line1',
    'company-address-line2',
    'company-town',
    'company-county',
    'company-postcode',
    'company-phone',
    'company-email',
    'company-website'
  ],
  'organisation-other-info': [
    'company-other-info'
  ],
  'organisation-another-company': [
    'another-company',
    'another-company-yes'
  ],
  'other-info': [
    'other-info-file-upload',
    {
      step: '/add-other-info-file-upload',
      field: 'other-info-file-upload'
    }
  ],
  'about-you': [
    'how-did-you-find-out-about-the-crime',
    'does-anyone-else-know',
    'have-you-reported-before',
    'how-do-you-know-the-person',
    'can-use-info-without-risk',
    'about-you-first-name',
    'about-you-family-name',
    {
      field: 'about-you-dob',
      parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
    },
    'about-you-nationality',
    'about-you-gender',
    'about-you-contact',
    'are-you-eighteen',
    'contact-number',
    'when-to-contact'
  ]
};
