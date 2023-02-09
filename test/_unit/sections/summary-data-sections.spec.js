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
    it('should check expected fields in crimeType section', () => {
      const sectionFields = mappedSections.crimeType;
      const expectedFields = [
        'crime-type',
        'immigration-crime-group',
        'smuggling-crime-group'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in crimeChildren section', () => {
      const sectionFields = mappedSections.crimeChildren;
      const expectedFields = [
        'crime-children'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in crimeTime section', () => {
      const sectionFields = mappedSections.crimeTime;
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

    it('should check expected fields in crimeTransport section', () => {
      const sectionFields = mappedSections.crimeTransport;
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

    it('should check expected fields in crimeDelivery section', () => {
      const sectionFields = mappedSections.crimeDelivery;
      const expectedFields = [
        'crime-delivery',
        'freight-more-info',
        'express-more-info',
        'post-more-info'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in crimeLocation section', () => {
      const sectionFields = mappedSections.crimeLocation;
      const expectedFields = [
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

    it('should check expected fields in personalDetails section', () => {
      const sectionFields = mappedSections.personalDetails;
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

    it('should check expected fields in personId section', () => {
      const sectionFields = mappedSections.personId;
      const expectedFields = [
        'report-person-passport',
        'report-person-id',
        'report-person-ni'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in personLocation section', () => {
      const sectionFields = mappedSections.personLocation;
      const expectedFields = [
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
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in personOccupation section', () => {
      const sectionFields = mappedSections.personOccupation;
      const expectedFields = [
        'report-person-occupation',
        'report-person-occupation-type',
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
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in personStudy section', () => {
      const sectionFields = mappedSections.personStudy;
      const expectedFields = [
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
        'report-person-study-manager-know'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in personTransport section', () => {
      const sectionFields = mappedSections.personTransport;
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

    it('should check expected fields in personDescription section', () => {
      const sectionFields = mappedSections.personDescription;
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
  });

  describe('Sections and Fields', () => {
    it('crimeType', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections.crimeType)
      ).to.be.true;
    });

    it('crimeChildren ', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections.crimeChildren)
      ).to.be.true;
    });

    it('crimeTime', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections.crimeTime)
      ).to.be.true;
    });

    it('crimeTransport', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections.crimeTransport)
      ).to.be.true;
    });

    it('crimeDelivery', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections.crimeDelivery)
      ).to.be.true;
    });

    it('crimeLocation', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections.crimeLocation)
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
  });
});
