'use strict';

const moment = require('moment');
const PRETTY_DATE_FORMAT = 'Do MMMM YYYY';
const OCCUPATION = require('../data/occupation');
const COUNTRIES = require('../data/countriesList');
const NATIONALITIES = require('../data/nationalities');
const COMPANY_TYPES = require('../data/companyTypes');
const _ = require('lodash');

module.exports = {
  'crime-type': [
    'crime-type',
    'immigration-crime-group',
    'smuggling-crime-group'
  ],
  'crime-children': [
    'crime-children'
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
    'when-will-crime-happen-more-info'
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
    {
      field: 'boat-country-departure',
      parse: v => _.get(_.find(COUNTRIES, group => group.value === v), 'label', '')
    },
    'port-departure',
    'port-arrival',
    'port-departure-time',
    'port-arrival-time',
    'train-company',
    {
      field: 'train-country-departure',
      parse: v => _.get(_.find(COUNTRIES, group => group.value === v), 'label', '')
    },
    'station-departure',
    'station-arrival',
    'station-departure-time',
    'station-arrival-time',
    'airline-company',
    'airline-flight-number',
    {
      field: 'airline-country-departure',
      parse: v => _.get(_.find(COUNTRIES, group => group.value === v), 'label', '')
    },
    'airport-departure',
    'airport-arrival',
    'airport-departure-time',
    'airport-arrival-time'
  ],
  'crime-delivery': [
    'crime-delivery',
    'freight-more-info',
    'express-more-info',
    'post-more-info'
  ],
  'crime-location': [
    'crime-location',
    {
      field: 'crime-location-country',
      parse: v => _.get(_.find(COUNTRIES, group => group.value === v), 'label', '')
    },
    'crime-location-address-line1',
    'crime-location-address-line2',
    'crime-location-address-town',
    'crime-location-address-county',
    'crime-location-address-postcode',
    'crime-location-phone',
    'crime-another-location',
    {
      field: 'crime-another-location-country',
      parse: v => _.get(_.find(COUNTRIES, group => group.value === v), 'label', '')
    },
    'crime-another-location-address-line1',
    'crime-another-location-address-line2',
    'crime-another-location-address-town',
    'crime-another-location-address-county',
    'crime-another-location-address-postcode',
    'crime-another-location-phone'
  ],
  person: [
    'report-person'
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
    {
      field: 'report-person-nationality',
      parse: v => _.get(_.find(NATIONALITIES, group => group.value === v), 'label', '')
    },
    'report-person-place-of-birth',
    'report-person-gender'
  ],
  'person-id': [
    'report-person-passport',
    'report-person-id',
    'report-person-ni'
  ],
  'person-contact': [
    'report-person-location',
    'report-person-location-uk-address-line1',
    'report-person-location-uk-address-line2',
    'report-person-location-uk-address-town',
    'report-person-location-uk-address-county',
    'report-person-location-uk-address-postcode',
    {
      field: 'report-person-location-outside-uk-address-country',
      parse: v => _.get(_.find(COUNTRIES, group => group.value === v), 'label', '')
    },
    'report-person-location-outside-uk-address-line1',
    'report-person-location-outside-uk-address-line2',
    'report-person-location-outside-uk-address-town',
    'report-person-location-outside-uk-address-county',
    'report-person-location-outside-uk-address-postcode',
    'report-person-location-type',
    'report-person-location-outside-uk-type',
    'report-person-location-mobile',
    'report-person-location-outside-uk-mobile',
    'report-person-location-phone',
    'report-person-location-outside-uk-phone',
    'report-person-location-email',
    'report-person-location-outside-uk-email',
    {
      field: 'report-person-location-travel-to-uk-country',
      parse: v => _.get(_.find(COUNTRIES, group => group.value === v), 'label', '')
    },
    'report-person-location-travel-to-uk-how',
    'report-person-location-travel-to-uk-where'
  ],
  'person-occupation': [
    'report-person-occupation',
    {
      field: 'report-person-occupation-type',
      parse: v => _.get(_.find(OCCUPATION, group => group.value === v), 'label', '')
    },
    'report-person-occupation-government-employee',
    'report-person-occupation-government-dept',
    'government-dept-other',
    'report-person-occupation-other',
    'report-person-occupation-hours',
    'report-person-occupation-days',
    'report-person-occupation-where',
    'report-person-occupation-company-name',
    'report-person-occupation-company-address-line1',
    'report-person-occupation-company-address-line2',
    'report-person-occupation-company-address-town',
    'report-person-occupation-company-address-county',
    'report-person-occupation-company-address-postcode',
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
    'report-person-study-address-line1',
    'report-person-study-address-line2',
    'report-person-study-address-town',
    'report-person-study-address-county',
    'report-person-study-address-postcode',
    'report-person-study-phone',
    'report-person-study-email',
    'report-person-study-url',
    'report-person-study-manager',
    'report-person-study-manager-know'
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
    'report-person-transport-other'
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
    {
      field: 'company-types',
      parse: v => _.get(_.find(COMPANY_TYPES, group => group.value === v), 'label', '')
    },
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
    'other-info-description',
    'other-info-another-crime',
    'other-info-another-crime-description',
    {
      step: '/add-other-info-file-upload',
      field: 'images',
      parse: (list, req) => {
        if (!req.sessionModel.get('images') ) {
          return null;
        }
        return list && list.map(a => a.name).join('\n————————————————\n') || 'None';
      }
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
    {
      field: 'about-you-nationality',
      parse: v => _.get(_.find(NATIONALITIES, group => group.value === v), 'label', '')
    },
    'about-you-gender',
    'about-you-contact',
    'are-you-eighteen',
    'contact-number',
    'when-to-contact'
  ]
};
