const sections = require('../../../apps/paf/sections/summary-data-sections.js');
const pages = require('../../../apps/paf/translations/src/en/pages.json');
const fields = require('../../../apps/paf/fields/index.js');
const utilities = require('../../helpers/utilities');

const mappedSections = utilities.mapSections(sections);
const areOrderedEqual = utilities.areOrderedEqual;
const containsAll = utilities.containsAll;

describe('PAF Summary Data Sections', () => {
  describe('Sections and Pages', () => {
    it('should have sections and page translations that correlate', () => {
      const sectionsKeys = Object.keys(sections).sort();
      const pagesSectionsKeys = Object.keys(pages.confirm.sections).sort();
      sectionsKeys.should.deep.equal(pagesSectionsKeys);
    });
  });

  describe('Section Primary Fields', () => {
    it('should check expected fields in crime-type section', () => {
      const sectionFields = mappedSections['crime-type'];
      const expectedFields = [
        'crime-type',
        'immigration-crime-group',
        'smuggling-crime-group'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in crime-children section', () => {
      const sectionFields = mappedSections['crime-children'];
      const expectedFields = [
        'crime-children'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in crime-time section', () => {
      const sectionFields = mappedSections['crime-time'];
      const expectedFields = [
        'when-crime-happened',
        'happening-now-info',
        'ongoing-info',
        'already-happened-info',
        'when-will-crime-happen',
        'date-crime-will-happen',
        'time-crime-will-happen',
        'when-will-crime-happen-more-info'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in crime-transport section', () => {
      const sectionFields = mappedSections['crime-transport'];
      const expectedFields = [
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
        'airport-arrival-time'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in crime-delivery section', () => {
      const sectionFields = mappedSections['crime-delivery'];
      const expectedFields = [
        'crime-delivery',
        'freight-more-info',
        'express-more-info',
        'post-more-info'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in crime-location section', () => {
      const sectionFields = mappedSections['crime-location'];
      const expectedFields = [
        'crime-location',
        'crime-location-country',
        'crime-location-address-line1',
        'crime-location-address-line2',
        'crime-location-address-town',
        'crime-location-address-county',
        'crime-location-address-postcode',
        'crime-location-phone',
        'crime-another-location',
        'crime-another-location-country',
        'crime-another-location-address-line1',
        'crime-another-location-address-line2',
        'crime-another-location-address-town',
        'crime-another-location-address-county',
        'crime-another-location-address-postcode',
        'crime-another-location-phone'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in person section', () => {
      const sectionFields = mappedSections.person;
      const expectedFields = [
        'report-person'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in personal-details section', () => {
      const sectionFields = mappedSections['personal-details'];
      const expectedFields = [
        'report-person-first-name',
        'report-person-family-name',
        'report-person-nickname',
        'report-person-dob',
        'report-person-age-range',
        'report-person-nationality',
        'report-person-place-of-birth',
        'report-person-gender'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in person-id section', () => {
      const sectionFields = mappedSections['person-id'];
      const expectedFields = [
        'report-person-passport',
        'report-person-id',
        'report-person-ni'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in person-contact section', () => {
      const sectionFields = mappedSections['person-contact'];
      const expectedFields = [
        'report-person-location',
        'report-person-location-type',
        'report-person-location-uk-address-line1',
        'report-person-location-uk-address-line2',
        'report-person-location-uk-address-town',
        'report-person-location-uk-address-county',
        'report-person-location-uk-address-postcode',
        'report-person-location-outside-uk-address-country',
        'report-person-location-outside-uk-address-line1',
        'report-person-location-outside-uk-address-line2',
        'report-person-location-outside-uk-address-town',
        'report-person-location-outside-uk-address-county',
        'report-person-location-outside-uk-address-postcode',
        'report-person-location-mobile',
        'report-person-location-phone',
        'report-person-location-email',
        'report-person-location-type',
        'report-person-location-travel-to-uk-country'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in person-occupation section', () => {
      const sectionFields = mappedSections['person-occupation'];
      const expectedFields = [
        'report-person-occupation',
        'report-person-occupation-type',
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
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in person-study section', () => {
      const sectionFields = mappedSections['person-study'];
      const expectedFields = [
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
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in person-transport section', () => {
      const sectionFields = mappedSections['person-transport'];
      const expectedFields = [
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
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in person-description section', () => {
      const sectionFields = mappedSections['person-description'];
      const expectedFields = [
        'report-person-description'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in person-details section', () => {
      const sectionFields = mappedSections['person-details'];
      const expectedFields = [
        'persons'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in organisation section', () => {
      const sectionFields = mappedSections.organisation;
      const expectedFields = [
        'report-organisation',
        'organisation-company-name',
        'company-types',
        'company-owner',
        'owner-know-about-the-crime'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in organisation-contact section', () => {
      const sectionFields = mappedSections['organisation-contact'];
      const expectedFields = [
        'company-address-line1',
        'company-address-line2',
        'company-town',
        'company-county',
        'company-postcode',
        'company-phone',
        'company-email',
        'company-website'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in organisation-other-info section', () => {
      const sectionFields = mappedSections['organisation-other-info'];
      const expectedFields = [
        'company-other-info'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in organisation-another-company section', () => {
      const sectionFields = mappedSections['organisation-another-company'];
      const expectedFields = [
        'another-company',
        'another-company-yes'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });
  });

  describe('Sections and Fields', () => {
    it('crime-type', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections['crime-type'])
      ).to.be.true;
    });

    it('crime-children ', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections['crime-children'])
      ).to.be.true;
    });

    it('crime-time', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections['crime-time'])
      ).to.be.true;
    });

    it('crime-transport', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections['crime-transport'])
      ).to.be.true;
    });

    it('crime-delivery', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections['crime-delivery'])
      ).to.be.true;
    });

    it('crime-location', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections['crime-location'])
      ).to.be.true;
    });

    it('person', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections.person)
      ).to.be.true;
    });

    it('organisation', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections.organisation)
      ).to.be.true;
    });

    it('organisation-contact', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections['organisation-contact'])
      ).to.be.true;
    });

    it('organisation-other-info', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections['organisation-other-info'])
      ).to.be.true;
    });

    it('organisation-another-company', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections['organisation-another-company'])
      ).to.be.true;
    });
  });
});
