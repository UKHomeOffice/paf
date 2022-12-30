'use strict';

const moment = require('moment');
const PRETTY_DATE_FORMAT = 'Do MMMM YYYY';
const _ = require('lodash');

module.exports = {
  crime: [
    'crime-type'
  ],
  person: [
    'report-person',
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
    'report-person-passport',
    'report-person-id',
    'report-person-ni',
    'report-person-location-uk-contact-details-building',
    'report-person-location-uk-contact-details-street',
    'report-person-location-uk-contact-details-townOrCity',
    'report-person-location-uk-contact-details-county',
    'report-person-location-uk-contact-details-postcodeOrZIPCode',
    'report-person-location-mobile',
    'report-person-location-phone',
    'report-person-location-email',
    'report-person-location-type'
  ],
  'person-details': [
    {
      step: '/person-details',
      field: 'persons',
      // parse: field => {
      //   console.log(field)
      //   console.log((({ aggregatedValues }) => ({aggregatedValues : aggregatedValues.map(({itemTitle}) => ({itemTitle}))}))(field));
      //   return (({ aggregatedValues }) => ({aggregatedValues : aggregatedValues.map(({itemTitle}) => ({itemTitle}))}))(field)
      // },
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
