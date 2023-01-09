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
    it("should check expected fields in crime section", () => {
      const sectionFields = mappedSections.crime;
      const expectedFields = [

      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in person section', () => {
      const sectionFields = mappedSections.person;
      const expectedFields = [
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in organisation section', () => {
      const sectionFields = mappedSections.organisation;
      const expectedFields = [
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in other info section', () => {
      const sectionFields = mappedSections.otherInfo;
      const expectedFields = [
        'other-info-file-upload',
        'images'
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });

    it('should check expected fields in about you section', () => {
      const sectionFields = mappedSections.aboutYou;
      const expectedFields = [
      ];
      const result = areOrderedEqual(sectionFields, expectedFields);
      expect(result).to.be.true;
    });
  });

  describe('Sections and Fields', () => {
    it('crime', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections.crime)
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

    it('otherInfo', () => {
      mappedSections.otherInfo.every(i => {
        const item = i.field || i;
        return Object.keys(fields).includes(item);
      });
    });

    it('aboutYou', () => {
      expect(containsAll(
        Object.keys(fields),
        mappedSections.aboutYou)
      ).to.be.true;
    });
  });
});
