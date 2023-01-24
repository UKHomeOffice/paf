'use strict';
/* eslint-disable */
require('hof/frontend/themes/gov-uk/client-js');

var $ = require('jquery');
var accessibleAutocomplete = require('accessible-autocomplete');
$('.typeahead').each(function applyTypeahead() {
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: this
  });
});
