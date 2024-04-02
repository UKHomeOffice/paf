
'use strict';

const nationalities = require('../data/nationalities');
const _ = require('lodash');
const countriesList = require('../data/countriesList');
const trainCompanies = require('../data/trainCompanies');
const airlineCompanies = require('../data/airlineCompanies');
const occupation = require('../data/occupation');
const companyTypes = require('../data/companyTypes');
const dateComponent = require('hof').components.date;
const personaddnationalities = require('../data/addPersonNationalities');

function notBothOptions(vals) {
  const values = _.castArray(vals);
  return !(values.length > 1 && values.indexOf('crime-transport-unknown') > -1);
}
function lettersAndSpacesOnly(value) {
  return /^[A-Za-z\s]*$/.test(value);
}
const moment = require('moment');
const after1900Validator = { type: 'after', arguments: ['1900'] };
const PRETTY_DATE_FORMAT = 'Do MMMM YYYY';
const todayDate = new Date().toString();
const afterCurrentYearValidator = { type: 'after', arguments: [todayDate] };
module.exports = {
  'crime-type': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [{
      value: 'immigration-crime',
      toggle: 'immigration-crime-group',
      child: 'checkbox-group'
    }, {
      value: 'smuggling-crime',
      toggle: 'smuggling-crime-group',
      child: 'checkbox-group'
    }],
    validate: 'required'
  },
  'immigration-crime-group': {
    mixin: 'checkbox-group',
    dependent: {
      field: 'crime-type',
      value: 'immigration-crime'
    },
    options: [
      'immigration-crime-no-permission',
      'immigration-crime-illegal-working',
      'immigration-crime-employing-illegal-workers',
      'immigration-crime-full-time-student',
      'immigration-crime-fake-marriage',
      'immigration-crime-fake-documents',
      'immigration-crime-enter-stay-illegally',
      'immigration-crime-lied-on-application',
      'immigration-crime-enter-human-trafficking-smuggling-slavery',
      'immigration-crime-other'
    ],
    validate: 'required'
  },
  'smuggling-crime-group': {
    mixin: 'checkbox-group',
    dependent: {
      field: 'crime-type',
      value: 'smuggling-crime'
    },
    options: [
      'smuggling-crime-drug',
      'smuggling-crime-cash',
      'smuggling-crime-cigarette',
      'smuggling-crime-firearms',
      'smuggling-crime-alcohol',
      'smuggling-crime-other'
    ],
    validate: 'required'
  },
  'crime-children': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no', 'crime-childen-unknown'],
    validate: 'required'
  },
  'when-crime-happened': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      {
        value: 'happening-now',
        toggle: 'happening-now-info',
        child: 'input-text'
      },
      {
        value: 'ongoing',
        toggle: 'ongoing-info',
        child: 'input-text'
      },
      {
        value: 'already-happened',
        toggle: 'already-happened-info',
        child: 'input-text'
      },
      'not-yet-happened',
      'dont-know-when-it-happend'
    ]
  },
  'happening-now-info': {
    dependent: {
      field: 'when-crime-happened',
      value: 'happening-now'
    },
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'ongoing-info': {
    dependent: {
      field: 'when-crime-happened',
      value: 'ongoing'
    },
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'already-happened-info': {
    dependent: {
      field: 'when-crime-happened',
      value: 'already-happened'
    },
    validate: ['notUrl', { type: 'maxlength', arguments: 50}]
  },
  'when-will-crime-happen': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      'next-twenty-four-hours',
      'more-than-twenty-four-hours',
      'when-will-crime-happen-unknown'
    ],
    validate: ['notUrl']
  },
  'date-crime-will-happen': dateComponent('date-crime-will-happen', {
    mixin: 'input-date',
    validate: [afterCurrentYearValidator]
  }),
  'time-crime-will-happen-hour': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-date-input__input', 'govuk-input--width-2'],
    attributes: [{ attribute: 'maxlength', value: '2' }],
    validate: ['numeric', { type: 'min', arguments: 0}, { type: 'max', arguments: 23 }]
  },
  'time-crime-will-happen-minute': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-date-input__input', 'govuk-input--width-2'],
    attributes: [{ attribute: 'maxlength', value: '2' }],
    validate: ['numeric', { type: 'min', arguments: 0}, { type: 'max', arguments: 59 }]
  },
  'time-crime-will-happen': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'when-will-crime-happen-more-info': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 1200 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, { attribute: 'rows', value: 8 }],
    labelClassName: 'visuallyhidden'
  },
  'crime-transport': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [{
      value: 'yes',
      toggle: 'transport-group',
      child: 'checkbox-group'
    },
    'no',
    'transport-unknown']
  },
  'transport-group': {
    mixin: 'checkbox-group',
    options: [
      'crime-transport-vehicle',
      'crime-transport-boat',
      'crime-transport-train',
      'crime-transport-aeroplane',
      'crime-transport-unknown'
    ],
    dependent: {
      field: 'crime-transport',
      value: 'yes'
    },
    validate: [notBothOptions]
  },
  'vehicle-type': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      'vehicle-bulk-carrier',
      {
        value: 'cars',
        toggle: 'crime-car-group',
        child: 'partials/crime-car-group'
      },
      'caravan',
      'coach',
      'container',
      'glass-carrier',
      {
        value: 'hgvs',
        toggle: 'crime-hgv-group',
        child: 'partials/crime-hgv-group'
      },
      {
        value: 'lorries',
        toggle: 'crime-lorry-group',
        child: 'partials/crime-lorry-group'
      },
      'minibus',
      'motorbike',
      'motorhome',
      'unaccompanied-trailer',
      {
        value: 'vans',
        toggle: 'crime-van-group',
        child: 'partials/crime-van-group'
      }
    ]
  },
  'vehicle-make': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'vehicle-model': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'vehicle-colour': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'vehicle-registration': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'crime-car-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'car',
      'car-transporter'
    ],
    dependent: {
      field: 'vehicle-type',
      value: 'cars'
    }
  },
  'crime-hgv-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'hgv-canvas-sided',
      'hgv-flatbed',
      'hgv-hard-sided',
      'hgv-refrigerated',
      'hgv-tanker'
    ],
    dependent: {
      field: 'vehicle-type',
      value: 'hgvs'
    }
  },
  'crime-lorry-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'lorry',
      'lorry-and-drag'
    ],
    dependent: {
      field: 'vehicle-type',
      value: 'lorries'
    }
  },
  'crime-van-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'van',
      'van-and-trailer',
      'van-other',
      'seven-point-five-tonne-van'
    ],
    dependent: {
      field: 'vehicle-type',
      value: 'vans'
    }
  },
  'boat-type': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      'barge',
      'cabin-cruiser',
      'cable-pipe-layer',
      {
        value: 'carriers',
        toggle: 'crime-carrier-group',
        child: 'partials/crime-carrier-group'
      },
      'catamaran-multihulled',
      'containership',
      'cruise-ship',
      'dayboat',
      'dinghy',
      'ferry',
      'fishing-boat',
      {
        value: 'general-cargos',
        toggle: 'crime-general-cargo-group',
        child: 'partials/crime-general-cargo-group'
      },
      'ketch',
      'reefer',
      {
        value: 'vessels',
        toggle: 'crime-vessel-group',
        child: 'partials/crime-vessel-group'
      },
      'rhib',
      'tanker',
      'tug',
      'yacht'
    ]
  },
  'crime-carrier-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'bulk-carrier',
      'vehicle-carrier',
      'vessel-carrier'
    ],
    dependent: {
      field: 'boat-type',
      value: 'carriers'
    }
  },
  'crime-general-cargo-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'general-cargo',
      'general-cargo-with-container-capacity'
    ],
    dependent: {
      field: 'boat-type',
      value: 'general-cargos'
    }
  },
  'crime-vessel-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'research-vessel',
      'supply-vessel',
      'support-vessel'
    ],
    dependent: {
      field: 'boat-type',
      value: 'vessels'
    }
  },
  'boat-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'boat-country-departure': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    validate: ['required', 'notUrl'],
    options:
      [{
        value: '',
        label: 'fields.boat-country-departure.options.null'
      }].concat(countriesList)
  },
  'port-departure': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'port-arrival': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'port-departure-time': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'port-arrival-time': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'train-company': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options:
      [{
        value: '',
        label: 'fields.train-company.options.null'
      }].concat(trainCompanies),
    validate: ['notUrl']
  },
  'train-country-departure': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    validate: ['required', 'notUrl'],
    options:
      [{
        value: '',
        label: 'fields.train-country-departure.options.null'
      }].concat(countriesList)
  },
  'station-departure': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'station-arrival': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'station-departure-time': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'station-arrival-time': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'airline-company': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options:
      [{
        value: '',
        label: 'fields.airline-company.options.null'
      }].concat(airlineCompanies),
    validate: ['notUrl']
  },
  'airline-flight-number': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'airline-country-departure': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    validate: ['notUrl', 'required', 'notUrl'],
    options:
      [{
        value: '',
        label: 'fields.airline-country-departure.options.null'
      }].concat(countriesList)
  },
  'airport-departure': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'airport-arrival': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'airport-departure-time': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'airport-arrival-time': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'crime-delivery': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      {
        value: 'freight-cargo',
        toggle: 'freight-more-info',
        child: 'textarea'
      },
      {
        value: 'express-mail-courier',
        toggle: 'express-more-info',
        child: 'textarea'
      },
      {
        value: 'post',
        toggle: 'post-more-info',
        child: 'textarea'
      },
      'none',
      'delivery-unknown'
    ]
  },
  'freight-more-info': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 1200 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, { attribute: 'rows', value: 8 }],
    dependent: {
      field: 'crime-delivery',
      value: 'freight-cargo'
    }
  },
  'express-more-info': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 1200 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, { attribute: 'rows', value: 8 }],
    dependent: {
      field: 'crime-delivery',
      value: 'express-mail-courier'
    }
  },
  'post-more-info': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 1200 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, { attribute: 'rows', value: 8 }],
    dependent: {
      field: 'crime-delivery',
      value: 'post'
    }
  },
  'crime-location': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      {
        value: 'yes',
        toggle: 'location-group',
        child: 'partials/crime-location-group'
      },
      'no']
  },
  'crime-location-country': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    validate: ['required', 'notUrl'],
    options:
      [{
        value: '',
        label: 'fields.crime-location-country.options.null'
      }].concat(countriesList),
    dependent: {
      field: 'crime-location',
      value: 'yes'
    }
  },
  'crime-location-address-line1': {
    mixin: 'input-text',
    dependent: {
      field: 'crime-location',
      value: 'yes'
    },
    validate: ['notUrl']
  },
  'crime-location-address-line2': {
    mixin: 'input-text',
    dependent: {
      field: 'crime-location',
      value: 'yes'
    },
    validate: ['notUrl']
  },
  'crime-location-address-town': {
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    dependent: {
      field: 'crime-location',
      value: 'yes'
    },
    validate: ['notUrl']
  },
  'crime-location-address-county': {
    mixin: 'input-text',
    dependent: {
      field: 'crime-location',
      value: 'yes'
    },
    validate: ['notUrl']
  },
  'crime-location-address-postcode': {
    className: ['govuk-input', 'govuk-input--width-10'],
    dependent: {
      field: 'crime-location',
      value: 'yes'
    },
    validate: ['notUrl']
  },
  'crime-location-phone': {
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['internationalPhoneNumber', { type: 'maxlength', arguments: 20 }],
    dependent: {
      field: 'crime-location',
      value: 'yes'
    }
  },
  'crime-another-location': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      {
        value: 'yes',
        toggle: 'another-location-group',
        child: 'partials/crime-another-location-group'
      },
      'no']
  },
  'crime-another-location-country': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    validate: ['required', 'notUrl'],
    options:
      [{
        value: '',
        label: 'fields.crime-another-location-country.options.null'
      }].concat(countriesList),
    dependent: {
      field: 'crime-another-location',
      value: 'yes'
    }
  },
  'crime-another-location-address-line1': {
    mixin: 'input-text',
    dependent: {
      field: 'crime-another-location',
      value: 'yes'
    },
    validate: ['notUrl']
  },
  'crime-another-location-address-line2': {
    mixin: 'input-text',
    dependent: {
      field: 'crime-another-location',
      value: 'yes'
    },
    validate: ['notUrl']
  },
  'crime-another-location-address-town': {
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    dependent: {
      field: 'crime-another-location',
      value: 'yes'
    },
    validate: ['notUrl']
  },
  'crime-another-location-address-county': {
    mixin: 'input-text',
    dependent: {
      field: 'crime-another-location',
      value: 'yes'
    },
    validate: ['notUrl']
  },
  'crime-another-location-address-postcode': {
    className: ['govuk-input', 'govuk-input--width-10'],
    dependent: {
      field: 'crime-another-location',
      value: 'yes'
    },
    validate: ['notUrl']
  },
  'crime-another-location-phone': {
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['internationalPhoneNumber', { type: 'maxlength', arguments: 20 }],
    dependent: {
      field: 'crime-another-location',
      value: 'yes'
    }
  },
  'report-person': {
    mixin: 'radio-group',
    options: ['yes', 'no']
  },
  'report-person-first-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }, lettersAndSpacesOnly]
  },
  'report-person-family-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }, lettersAndSpacesOnly]
  },
  'report-person-nickname': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }, lettersAndSpacesOnly]
  },
  'report-person-place-of-birth': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }, lettersAndSpacesOnly]
  },
  'report-person-dob': dateComponent('report-person-dob', {
    isPageHeading: true,
    mixin: 'input-date',
    validate: ['before', after1900Validator]
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
      '75+'
    ]
  },
  'report-person-nationality': {
    mixin: 'select',
    className: 'typeahead',
    options:
      [{
        value: '',
        label: 'fields.report-person-nationality.options.null'
      }].concat(nationalities),
    validate: ['notUrl']
  },
  'report-person-gender': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      'male',
      'female',
      'other',
      'gender-unknown'
    ]
  },
  'report-person-passport': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-id': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-ni': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-location': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      'uk',
      'outside-uk',
      'travel-to-uk',
      'location-unknown'
    ]
  },
  'report-person-location-uk-address-line1': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'report-person-location-uk-address-line2': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'report-person-location-uk-address-town': {
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['notUrl']
  },
  'report-person-location-uk-address-county': {
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['notUrl']
  },
  'report-person-location-uk-address-postcode': {
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10'],
    validate: ['notUrl', { type: 'maxlength', arguments: 20 }]
  },
  'report-person-location-outside-uk-address-country': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    validate: ['required', 'notUrl'],
    options:
      [{
        value: '',
        label: 'fields.report-person-location-outside-uk-address-country.options.null'
      }].concat(countriesList)
  },
  'report-person-location-outside-uk-address-line1': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'report-person-location-outside-uk-address-line2': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'report-person-location-outside-uk-address-town': {
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['notUrl']
  },
  'report-person-location-outside-uk-address-county': {
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['notUrl']
  },
  'report-person-location-outside-uk-address-postcode': {
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10'],
    validate: ['notUrl', { type: 'maxlength', arguments: 20 }]
  },
  'report-person-location-travel-to-uk-country': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    validate: ['required', 'notUrl'],
    options:
      [{
        value: '',
        label: 'fields.report-person-location-travel-to-uk-country.options.null'
      }].concat(countriesList)
  },
  'report-person-location-travel-to-uk-how': {
    mixin: 'input-text'
  },
  'report-person-location-travel-to-uk-where': {
    mixin: 'input-text'
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
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', 'internationalPhoneNumber', { type: 'maxlength', arguments: 20 }]
  },
  'report-person-location-phone': {
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', 'internationalPhoneNumber', { type: 'maxlength', arguments: 20 }]
  },
  'report-person-location-email': {
    validate: ['email', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-location-outside-uk-type': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      'home',
      'relative',
      'work'
    ]
  },
  'report-person-location-outside-uk-mobile': {
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: [{ type: 'maxlength', arguments: 20 }]
  },
  'report-person-location-outside-uk-phone': {
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', { type: 'maxlength', arguments: 20 }]
  },
  'report-person-location-outside-uk-email': {
    validate: ['email', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-occupation': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: ['yes', 'no', 'occupation-unknown']
  },
  'report-person-occupation-type': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options:
      [{
        value: '',
        label: 'fields.report-person-occupation-type.options.null'
      }].concat(occupation),
    validate: ['notUrl']
  },
  'report-person-occupation-government-employee': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: ['yes', 'no', 'govt-employ-unknown']
  },
  'report-person-occupation-government-dept': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      'uk-border-agency',
      'border-force',
      'hmrc',
      'dwp',
      {
        value: 'other',
        toggle: 'government-dept-other',
        child: 'input-text'
      }
    ]
  },
  'government-dept-other': {
    dependent: {
      field: 'report-person-occupation-government-dept',
      value: 'other'
    },
    validate: ['notUrl']
  },
  'report-person-occupation-other': {
    labelClassName: 'visuallyhidden',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'report-person-occupation-hours': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-occupation-days': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-occupation-where': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no', 'occupation-where-unknown']
  },
  'report-person-occupation-company-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'report-person-occupation-company-address-line1': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'report-person-occupation-company-address-line2': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'report-person-occupation-company-address-town': {
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['notUrl']
  },
  'report-person-occupation-company-address-county': {
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['notUrl']
  },
  'report-person-occupation-company-address-postcode': {
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10'],
    validate: ['notUrl', { type: 'maxlength', arguments: 20 }]
  },
  'report-person-occupation-company-phone': {
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', 'internationalPhoneNumber', { type: 'maxlength', arguments: 20 }]
  },
  'report-person-occupation-company-manager': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-occupation-company-manager-know': {
    mixin: 'radio-group',
    options: ['yes', 'no', 'occ-manager-know-unknown']
  },
  'report-person-study': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: ['yes', 'no', 'study-unknown']
  },
  'report-person-study-subject': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 250 }]
  },
  'report-person-study-location': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no', 'study-location-unknown']
  },
  'report-person-study-where': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no', 'study-where-unknown']
  },
  'report-person-study-hours': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-study-days': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-study-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'report-person-study-address-line1': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'report-person-study-address-line2': {
    mixin: 'input-text',
    validate: ['notUrl']
  },
  'report-person-study-address-town': {
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['notUrl']
  },
  'report-person-study-address-county': {
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['notUrl']
  },
  'report-person-study-address-postcode': {
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10'],
    validate: ['notUrl', { type: 'maxlength', arguments: 20 }]
  },
  'report-person-study-phone': {
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', 'internationalPhoneNumber', { type: 'maxlength', arguments: 20 }]
  },
  'report-person-study-email': {
    validate: ['notUrl', 'email', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-study-url': {
    mixin: 'input-text',
    formatters: ['removespaces'],
    validate: ['url', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-study-manager': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-study-manager-know': {
    mixin: 'radio-group',
    options: ['yes', 'no', 'study-manager-know-unknown']
  },
  'report-person-transport': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no', 'transport-unknown']
  },
  'report-transport-group': {
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
      'vehicle-bulk-carrier',
      {
        value: 'cars',
        toggle: 'report-person-transport-car-group',
        child: 'partials/report-person-transport-car-group'
      },
      'caravan',
      'coach',
      'container',
      'glass-carrier',
      {
        value: 'hgv',
        toggle: 'report-person-transport-hgv-group',
        child: 'partials/report-person-transport-hgv-group'
      },
      {
        value: 'lorries',
        toggle: 'report-person-transport-lorry-group',
        child: 'partials/report-person-transport-lorry-group'
      },
      'minibus',
      'motorbike',
      'motorhome',
      'unaccompanied-trailer',
      {
        value: 'vans',
        toggle: 'report-person-transport-van-group',
        child: 'partials/report-person-transport-van-group'
      }
    ]
  },
  'report-person-transport-car-group': {
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
    }
  },
  'report-person-transport-hgv-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'hgv-canvas-sided',
      'hgv-flatbed',
      'hgv-hard-sided',
      'hgv-refrigerated',
      'hgv-tanker'
    ],
    dependent: {
      field: 'report-person-transport-type',
      value: 'hgv'
    }
  },
  'report-person-transport-lorry-group': {
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
    }
  },
  'report-person-transport-van-group': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'van',
      'van-and-trailer',
      'van-other',
      'seven-point-five-tonne-van'
    ],
    dependent: {
      field: 'report-person-transport-type',
      value: 'vans'
    }
  },
  'report-person-transport-make': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'report-person-transport-model': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'report-person-transport-colour': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'report-person-transport-registration': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }]
  },
  'report-person-transport-other': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-person-description': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 1200 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, { attribute: 'rows', value: 8 }],
    labelClassName: 'visuallyhidden'
  },
  hasAdditionalPerson: {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no']
  },
  personAddNumber: {
    mixin: 'input-text',
    labelClassName: 'visuallyhidden',
    className: 'visuallyhidden',
    validate: ['notUrl']
  },
  personAddFirstName: {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }, lettersAndSpacesOnly]
  },
  personAddFamilyName: {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }, lettersAndSpacesOnly]
  },
  personAddNickname: {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }, lettersAndSpacesOnly]
  },
  personAddDob: dateComponent('personAddDob', {
    isPageHeading: true,
    mixin: 'input-date',
    validate: ['before', after1900Validator],
    parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
  }),
  personAddAgeRange: {
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
      '75+'
    ]
  },
  personAddNationality: {
    mixin: 'select',
    className: ['typeahead'],
    options:
      [{
        value: '',
        label: 'fields.report-person-nationality.options.null'
      }].concat(personaddnationalities)
  },
  personAddGender: {
    mixin: 'radio-group',
    isPageHeading: true,
    parse: (value, field, req) => req.translate(`fields[${field}].options.[${value}]`),
    options: [
      'male',
      'female',
      'other',
      'add-gender-unknown'
    ]
  },
  personAddPassport: {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  personAddId: {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  personAddNi: {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'report-organisation': {
    mixin: 'radio-group',
    options: ['yes', 'no', 'report-org-unknown']
  },
  'organisation-company-name': {
    isPageHeading: true,
    validate: [{ type: 'maxlength', arguments: 50 }]
  },
  'company-address-line1': {
    mixin: 'input-text'
  },
  'company-address-line2': {
    mixin: 'input-text'
  },
  'company-town': {
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'company-county': {
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'company-postcode': {
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10'],
    validate: ['notUrl', { type: 'maxlength', arguments: 20 }]
  },
  'company-phone': {
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', 'internationalPhoneNumber', { type: 'maxlength', arguments: 20 }]
  },
  'company-email': {
    formatter: ['removespaces'],
    validate: ['email', { type: 'maxlength', arguments: 100 }]
  },
  'company-website': {
    formatter: ['removespaces'],
    validate: ['url', { type: 'maxlength', arguments: 100 }]
  },
  'company-types': {
    isPageHeading: true,
    mixin: 'select',
    className: 'typeahead',
    options:
      [{
        value: '',
        label: 'fields.company-types.options.null'
      }].concat(companyTypes)
  },
  'company-owner': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'owner-know-about-the-crime': {
    mixin: 'radio-group',
    options: [
      'yes',
      'no',
      'org-owner-know-unknown'
    ]
  },
  'company-other-info': {
    isPageHeading: true,
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 1200 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, { attribute: 'rows', value: 8 }]
  },
  'another-company': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: [
      {
        value: 'yes',
        toggle: 'another-company-yes',
        child: 'textarea'
      },
      'no'
    ]
  },
  'another-company-yes': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 1200 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, { attribute: 'rows', value: 5 }],
    dependent: {
      field: 'another-company',
      value: 'yes'
    }
  },
  'other-info-description': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 1200 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, { attribute: 'rows', value: 8 }]
  },
  'other-info-another-crime': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [{
      value: 'yes',
      toggle: 'other-info-another-crime-description',
      child: 'textarea'
    },
    'no'
    ],
    validate: ['notUrl']
  },
  'other-info-another-crime-description': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 1200 }],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, { attribute: 'rows', value: 8 }],
    dependent: {
      field: 'other-info-another-crime',
      value: 'yes'
    }
  },
  'other-info-file-upload': {
    mixin: 'input-file',
    className: 'govuk-file-upload',
    attributes: []
  },
  'add-other-info-file-upload': {
    isPageHeading: true,
    mixin: 'radio-group',
    options: ['yes', 'no']
  },
  'about-you-first-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }, lettersAndSpacesOnly]
  },
  'about-you-family-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }, lettersAndSpacesOnly]
  },
  'how-did-you-find-out-about-the-crime': {
    validate: ['notUrl', { type: 'maxlength', arguments: 500 }]
  },
  'does-anyone-else-know': {
    mixin: 'input-text',
    isPageHeading: true,
    validate: ['notUrl', { type: 'maxlength', arguments: 500 }]
  },
  'have-you-reported-before': {
    mixin: 'input-text',
    isPageHeading: true,
    validate: ['notUrl', { type: 'maxlength', arguments: 500 }]
  },
  'how-do-you-know-the-person': {
    mixin: 'input-text',
    isPageHeading: true,
    validate: ['notUrl', { type: 'maxlength', arguments: 500 }]
  },
  'can-use-info-without-risk': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      'yes',
      'no'
    ]
  },
  'about-you-dob': dateComponent('about-you-dob', {
    isPageHeading: true,
    mixin: 'input-date',
    validate: ['before', after1900Validator]
  }),
  'about-you-nationality': {
    isPageHeading: true,
    mixin: 'select',
    className: 'typeahead',
    options:
      [{
        value: '',
        label: 'fields.about-you-nationality.options.null'
      }].concat(nationalities),
    validate: ['notUrl']
  },
  'about-you-gender': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      'male',
      'female',
      'other',
      'prefer-not-to-say'
    ]
  },
  'about-you-contact': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [
      'yes',
      'no'
    ]
  },
  'are-you-eighteen': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: [{
      value: 'yes',
      toggle: 'contact-group',
      child: 'partials/contact-group'
    },
    'no'
    ]
  },
  'contact-group': {
    'contact-number': {
      label: 'Contact number'
    },
    'when-to-contact': {
      label: 'When would you like us to contact you?'
    }
  },
  'contact-number': {
    dependent: {
      field: 'are-you-eighteen',
      value: 'yes'
    },
    validate: ['required', 'internationalPhoneNumber', { type: 'maxlength', arguments: 20 }]
  },
  'when-to-contact': {
    dependent: {
      field: 'are-you-eighteen',
      value: 'yes'
    },
    validate: ['notUrl', { type: 'maxlength', arguments: 500 }]
  }
};
