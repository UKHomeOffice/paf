'use strict';
require('hof/frontend/themes/gov-uk/client-js');

const $ = require('jquery');
const accessibleAutocomplete = require('accessible-autocomplete');
$('.typeahead').each(function applyTypeahead() {
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: this
  });
});

const currentUrl = document.location.pathname;
const crime = document.getElementById('crime-nav');
const person = document.getElementById('person-nav');
const organisation = document.getElementById('organisation-nav');
const otherInfo = document.getElementById('other-info-nav');
const aboutYou = document.getElementById('about-you-nav');
const checkAnswers = document.getElementById('check-answers-nav');
if (currentUrl === '/paf/crime-type'
  || currentUrl === '/paf/crime-children'
  || currentUrl === '/paf/when-crime-happened'
  || currentUrl === '/paf/when-will-crime-happen'
  || currentUrl === '/paf/date-time-crime-will-happen'
  || currentUrl === '/paf/when-will-crime-happen-more-info'
  || currentUrl === '/paf/crime-transport'
  || currentUrl === '/paf/crime-transport-vehicle-type'
  || currentUrl === '/paf/crime-transport-vehicle-details'
  || currentUrl === '/paf/crime-transport-boat-type'
  || currentUrl === '/paf/crime-transport-boat-details'
  || currentUrl === '/paf/crime-transport-train-details'
  || currentUrl === '/paf/crime-transport-aeroplane-details'
  || currentUrl === '/paf/crime-delivery'
  || currentUrl === '/paf/crime-location'
  || currentUrl === '/paf/crime-another-location') {
  crime.classList.add('crime-nav');
} else if (currentUrl === '/paf/report-person'
  || currentUrl === '/paf/report-person-name'
  || currentUrl === '/paf/report-person-dob'
  || currentUrl === '/paf/report-person-age-range'
  || currentUrl === '/paf/report-person-nationality'
  || currentUrl === '/paf/report-person-place-of-birth'
  || currentUrl === '/paf/report-person-gender'
  || currentUrl === '/paf/report-person-id'
  || currentUrl === '/paf/report-person-location'
  || currentUrl === '/paf/report-person-location-uk-address'
  || currentUrl === '/paf/report-person-location-outside-uk-address'
  || currentUrl === '/paf/report-person-location-type'
  || currentUrl === '/paf/report-person-location-outside-uk-type'
  || currentUrl === '/paf/report-person-location-contact'
  || currentUrl === '/paf/report-person-location-outside-uk-contact'
  || currentUrl === '/paf/report-person-location-travel-to-uk'
  || currentUrl === '/paf/report-person-occupation'
  || currentUrl === '/paf/report-person-occupation-type'
  || currentUrl === '/paf/report-person-occupation-government-employee'
  || currentUrl === '/paf/report-person-occupation-government-dept'
  || currentUrl === '/paf/report-person-occupation-other'
  || currentUrl === '/paf/report-person-occupation-hours'
  || currentUrl === '/paf/report-person-occupation-days'
  || currentUrl === '/paf/report-person-occupation-where'
  || currentUrl === '/paf/report-person-occupation-company-name'
  || currentUrl === '/paf/report-person-occupation-company-address'
  || currentUrl === '/paf/report-person-occupation-company-manager'
  || currentUrl === '/paf/report-person-study'
  || currentUrl === '/paf/report-person-study-subject'
  || currentUrl === '/paf/report-person-study-location'
  || currentUrl === '/paf/report-person-study-hours'
  || currentUrl === '/paf/report-person-study-days'
  || currentUrl === '/paf/report-person-study-where'
  || currentUrl === '/paf/report-person-study-name'
  || currentUrl === '/paf/report-person-study-address'
  || currentUrl === '/paf/report-person-study-contact'
  || currentUrl === '/paf/report-person-study-manager'
  || currentUrl === '/paf/report-person-transport'
  || currentUrl === '/paf/report-person-transport-type'
  || currentUrl === '/paf/report-person-transport-details'
  || currentUrl === '/paf/report-person-description'
  || currentUrl === '/paf/has-additionalPerson'
  || currentUrl === '/paf/add-person'
  || currentUrl === '/paf/add-person-dob'
  || currentUrl === '/paf/add-person-age'
  || currentUrl === '/paf/add-person-nationality'
  || currentUrl === '/paf/add-person-gender'
  || currentUrl === '/paf/add-person-identity'
  || currentUrl === '/paf/person-details') {
  person.classList.add('person-nav');
} else if (currentUrl === '/paf/report-organisation'
  || currentUrl === '/paf/company-name'
  || currentUrl === '/paf/company-address'
  || currentUrl === '/paf/company-contact'
  || currentUrl === '/paf/company-types'
  || currentUrl === '/paf/company-owner'
  || currentUrl === '/paf/company-other-info'
  || currentUrl === '/paf/another-company') {
  organisation.classList.add('organisation-nav');
} else if (currentUrl === '/paf/other-info-description'
  || currentUrl === '/paf/other-info-another-crime'
  || currentUrl === '/paf/other-info-file-upload'
  || currentUrl === '/paf/add-other-info-file-upload') {
  otherInfo.classList.add('other-info-nav');
} else if (currentUrl === '/paf/about-you'
  || currentUrl === '/paf/does-anyone-else-know'
  || currentUrl === '/paf/have-you-reported-before'
  || currentUrl === '/paf/how-do-you-know-the-person'
  || currentUrl === '/paf/can-use-info-without-risk'
  || currentUrl === '/paf/about-you-details'
  || currentUrl === '/paf/about-you-dob'
  || currentUrl === '/paf/about-you-nationality'
  || currentUrl === '/paf/about-you-gender'
  || currentUrl === '/paf/about-you-contact'
  || currentUrl === '/paf/are-you-eighteen') {
  aboutYou.classList.add('about-you-nav');
} else if (currentUrl === '/paf/confirm') {
  checkAnswers.classList.add('check-answers-nav');
}
