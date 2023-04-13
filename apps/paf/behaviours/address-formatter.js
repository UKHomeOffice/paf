'use strict';


module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    if (req.sessionModel.get('crime-location-address-line1') || req.sessionModel.get('crime-location-address-line2') || req.sessionModel.get('crime-location-address-town') || req.sessionModel.get('crime-location-address-county')) {
      let crimeAddress = [];
      crimeAddress.push(req.sessionModel.get('crime-location-address-line1'), req.sessionModel.get('crime-location-address-line2'), req.sessionModel.get('crime-location-address-town'), req.sessionModel.get('crime-location-address-county'))
      crimeAddress = crimeAddress.filter((str) => str !== '')
      req.sessionModel.set('crime-location-address', crimeAddress.join(', '));
    } else {
      req.sessionModel.unset('crime-location-address')
    }

    if (req.sessionModel.get('crime-another-location-address-line1') || req.sessionModel.get('crime-another-location-address-line2') || req.sessionModel.get('crime-another-location-address-town') || req.sessionModel.get('crime-another-location-address-county')) {
      let crimeAnotherAddress = [];
      crimeAnotherAddress.push(req.sessionModel.get('crime-another-location-address-line1'), req.sessionModel.get('crime-another-location-address-line2'), req.sessionModel.get('crime-another-location-address-town'), req.sessionModel.get('crime-another-location-address-county'))
      crimeAnotherAddress = crimeAnotherAddress.filter((str) => str !== '')
      req.sessionModel.set('crime-another-location-address', crimeAnotherAddress.join(', '));
    } else {
      req.sessionModel.unset('crime-another-location-address')
    }

    if (req.sessionModel.get('report-person-location-uk-address-line1') || req.sessionModel.get('report-person-location-uk-address-line2') || req.sessionModel.get('report-person-location-uk-address-town') || req.sessionModel.get('report-person-location-uk-address-county')) {
      let personUkAddress = [];
      personUkAddress.push(req.sessionModel.get('report-person-location-uk-address-line1'), req.sessionModel.get('report-person-location-uk-address-line2'), req.sessionModel.get('report-person-location-uk-address-town'), req.sessionModel.get('report-person-location-uk-address-county'))
      personUkAddress = personUkAddress.filter((str) => str !== '')
      req.sessionModel.set('report-person-location-uk-address', personUkAddress.join(', '));
    } else {
      req.sessionModel.unset('report-person-location-uk-address')
    }

    if (req.sessionModel.get('report-person-location-outside-uk-address-line1') || req.sessionModel.get('report-person-location-outside-uk-address-line2') || req.sessionModel.get('report-person-location-outside-uk-address-town') || req.sessionModel.get('report-person-location-outside-uk-address-county')) {
      let personOutsideUkAddress = [];
      personOutsideUkAddress.push(req.sessionModel.get('report-person-location-outside-uk-address-line1'), req.sessionModel.get('report-person-location-outside-uk-address-line2'), req.sessionModel.get('report-person-location-outside-uk-address-town'), req.sessionModel.get('report-person-location-outside-uk-address-county'))
      personOutsideUkAddress = personOutsideUkAddress.filter((str) => str !== '')
      req.sessionModel.set('report-person-location-outside-uk-address', personOutsideUkAddress.join(', '));
    } else {
      req.sessionModel.unset('report-person-location-outside-uk-address')
    }

    if (req.sessionModel.get('report-person-occupation-company-address-line1') || req.sessionModel.get('report-person-occupation-company-address-line2') || req.sessionModel.get('report-person-occupation-company-address-town') || req.sessionModel.get('report-person-occupation-company-address-county')) {
      let personWorkAddress = [];
      personWorkAddress.push(req.sessionModel.get('report-person-occupation-company-address-line1'), req.sessionModel.get('report-person-occupation-company-address-line2'), req.sessionModel.get('report-person-occupation-company-address-town'), req.sessionModel.get('report-person-occupation-company-address-county'))
      personWorkAddress = personWorkAddress.filter((str) => str !== '')
      req.sessionModel.set('report-person-occupation-company-address', personWorkAddress.join(', '));
    } else {
      req.sessionModel.unset('report-person-occupation-company-address')
    }

    if (req.sessionModel.get('report-person-study-address-line1') || req.sessionModel.get('report-person-study-address-line2') || req.sessionModel.get('report-person-study-address-town') || req.sessionModel.get('report-person-study-address-county')) {
      let personStudyAddress = [];
      personStudyAddress.push(req.sessionModel.get('report-person-study-address-line1'), req.sessionModel.get('report-person-study-address-line2'), req.sessionModel.get('report-person-study-address-town'), req.sessionModel.get('report-person-study-address-county'))
      personStudyAddress = personStudyAddress.filter((str) => str !== '')
      req.sessionModel.set('report-person-study-address', personStudyAddress.join(', '));
    } else {
      req.sessionModel.unset('report-person-study-address')
    }

    if (req.sessionModel.get('company-address-line1') || req.sessionModel.get('company-address-line2') || req.sessionModel.get('company-town') || req.sessionModel.get('company-county')) {
      let companyAddress = [];
      companyAddress.push(req.sessionModel.get('company-address-line1'), req.sessionModel.get('company-address-line2'), req.sessionModel.get('company-town'), req.sessionModel.get('company-county'))
      companyAddress = companyAddress.filter((str) => str !== '')
      req.sessionModel.set('company-address', companyAddress.join(', '));
    } else {
      req.sessionModel.unset('company-address')
    }
    return super.configure(req, res, next);
  }
};
