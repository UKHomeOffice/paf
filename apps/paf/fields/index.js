'use strict';
const nationalities = require('../data/nationalities');
const countriesList = require('../data/countriesList');
const occupation = require('../data/occupation');
const dateComponent = require('hof').components.date;

module.exports = {

  'report-person': {
    mixin: 'radio-group',
    options: ['yes', 'no', 'unknown']
  },
  'report-person-dob': dateComponent('report-person-dob', {
    isPageHeading: true,
    mixin: 'input-date'
  }),
  'report-person-age-range': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      '0-17',
      '18-24',
      '25-34',
      '35-44',
      '45-54',
      '55-64',
      '65-74',
      '74+'
    ]
  },
  'report-person-nationality': {
    mixin: 'select',
    className: 'typeahead',
    options:
      [{
        value: '',
        label: 'fields.report-person-nationality.options.null'
      }].concat(nationalities)
  },
  'report-person-gender': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      'male',
      'female',
      'other',
      'unknown'
    ]
  },
  'report-person-location': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      'uk',
      'outside-uk',
      'travel-to-uk',
      'unknown']
  },
  'report-person-location-uk-contact-details-townOrCity': {
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'report-person-location-uk-contact-details-postcodeOrZIPCode': {
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'report-person-location-outside-uk-contact-details-country': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options:
      [{
        value: '',
        label: 'fields.report-person-location-outside-uk-contact-details-country.options.null'
      }].concat(countriesList)
  },
  'report-person-location-outside-uk-contact-details-townOrCity': {
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'report-person-location-outside-uk-contact-details-postcodeOrZIPCode': {
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'report-person-location-travel-to-uk-country': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options:
      [{
        value: '',
        label: 'fields.report-person-location-travel-to-uk-country.options.null'
      }].concat(countriesList)
  },
  'report-person-location-type': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      'home',
      'relative',
      'work'
    ]
  },
  'report-person-location-mobile': {
    className: ['govuk-input', 'govuk-input--width-20']
  },
  'report-person-location-phone': {
    className: ['govuk-input', 'govuk-input--width-20']
  },
  'report-person-location-email': {
    validate: ['email']
  },
  'report-person-occupation': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: ['yes', 'no', 'unknown']
  },
  'report-person-occupation-type': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options:
      [{
        value: '',
        label: 'fields.report-person-occupation-type.options.null'
      }].concat(occupation)
  },
  'report-person-occupation-where': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no', 'unknown']
  },
  'report-person-occupation-company-contact-details-townOrCity': {
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'report-person-occupation-company-contact-details-postcodeOrZIPCode': {
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'report-person-occupation-company-phone': {
    className: ['govuk-input', 'govuk-input--width-20']
  },
  'report-person-occupation-company-manager-know': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: ['yes', 'no', 'unknown']
  },
  'report-person-study': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: ['yes', 'no', 'unknown']
  },
  'report-person-study-location': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no', 'unknown']
  },
  'report-person-study-where': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no', 'unknown']
  },
  'report-person-study-contact-details-townOrCity': {
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'report-person-study-contact-details-postcodeOrZIPCode': {
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'report-person-study-phone': {
    className: ['govuk-input', 'govuk-input--width-20']
  },
  'report-person-study-manager-know': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: ['yes', 'no', 'unknown']
  },
  'report-person-transport': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no', 'unknown']
  },
  'transport-group': {
    legend: {
      className: 'visuallyhidden'
    },
    dependent: {
      field: 'report-person-transport',
      value: 'yes'
    }
  },
  'report-person-transport-type': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      'boat',
      'bulk-carrier',
      {
        value: 'cars',
        toggle: 'car-group',
        child: 'partials/car-group'
      },
      'caravan',
      'coach',
      'container',
      'glass-carrier',
      {
        value: 'hgv',
        toggle: 'hgv-group',
        child: 'partials/hgv-group'
      },
      {
        value: 'lorries',
        toggle: 'lorry-group',
        child: 'partials/lorry-group'
      },
      'minibus',
      'motorbike',
      'motorhome',
      'unaccompanied-trailer',
      {
        value: 'vans',
        toggle: 'van-group',
        child: 'partials/van-group'
      }
    ]
  },
  'car-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'car',
      'car-transporter'
    ],
    dependent: {
      field: 'report-person-transport-type',
      value: 'cars'
    },
  },
  'hgv-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'hgv-canvas-sided',
      'hgv-flatbed',
      'hgv-hard-sided',
      'hgv-refridgerated',
      'hgv-tanker'
    ],
    dependent: {
      field: 'report-person-transport-type',
      value: 'hgv'
    },
  },
  'lorry-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'lorry',
      'lorry-and-drag'
    ],
    dependent: {
      field: 'report-person-transport-type',
      value: 'lorries'
    },
  },
  'van-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'van',
      'van-and-trailer',
      'van-other',
      'seven-point-five-tonne-van',
    ],
    dependent: {
      field: 'report-person-transport-type',
      value: 'vans'
    },
  },
  'report-person-description': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: [{ type: 'maxlength', arguments: 1200 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, { attribute: 'rows', value: 8 }],
    labelClassName: 'visuallyhidden'
  },
  'hasAdditionalPerson': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no']
  },
  'personAddNumber': {
    mixin: 'input-text',
    labelClassName: 'visuallyhidden',
    className: 'visuallyhidden'
  },
  'personAddFirstName': {
    mixin: 'input-text'
  },
  'personAddFamilyName': {
    mixin: 'input-text'
  },
  'personAddNickname': {
    mixin: 'input-text'
  },
  'personAddDob': dateComponent('personAddDob', {
    isPageHeading: true,
    mixin: 'input-date'
  }),
  'personAddAgeRange': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      '0-17',
      '18-24',
      '25-34',
      '35-44',
      '45-54',
      '55-64',
      '65-74',
      '74+'
    ]
  },
  'personAddNationality': {
    mixin: 'select',
    className: ['typeahead'],
    options:
      [{
        value: '',
        label: 'fields.report-person-nationality.options.null'
      }].concat(nationalities)
  },
  'personAddPlaceOfBirth': {
    mixin: 'input-text'
  },
  'personAddGender': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      'male',
      'female',
      'other',
      'unknown'
    ]
  },
  'personAddPassport': {
    mixin: 'input-text'
  },
  'personAddId': {
    mixin: 'input-text'
  },
  'personAddNi': {
    mixin: 'input-text'
  }
};
