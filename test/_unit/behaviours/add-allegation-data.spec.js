'use strict';

const expect = chai.expect;
const { addAllegationData } = require('../../../lib/add-allegation-data');
const dataWithAdditionalPersonAndFile = require('../../helpers/add-allegation-data/data_with_addition_person');

describe("apps/lib 'add-allegation-data' behaviour should ", () => {
  let addAllegationDataWithAdditionalPerAndFileRes;

  it('export a function', () => {
    expect(addAllegationData).to.be.a('function');
  });
  describe("apps/lib 'add-allegation-data' with additional people and file uploaded", () => {
    before(() => {
      addAllegationDataWithAdditionalPerAndFileRes = addAllegationData(dataWithAdditionalPersonAndFile);
    });

    it('addAlligationData response have EformFields, AdditionalPeople, Attachements', () => {
      JSON.parse(addAllegationDataWithAdditionalPerAndFileRes).should.have.property('EformFields');
      JSON.parse(addAllegationDataWithAdditionalPerAndFileRes).should.have.property('AdditionalPeople');
      JSON.parse(addAllegationDataWithAdditionalPerAndFileRes).should.have.property('Attachements');
    });

    it('addAlligationData contain rdpermoreinfomore set to true when Additional person is selected', () => {
      JSON.parse(addAllegationDataWithAdditionalPerAndFileRes).should.have.property('EformFields')
        .to.have.deep.contain({FieldName: 'rdpermoreinfomore', FieldValue: 'Yes'});
    });

    it('addAlligationData contain AdditionalPeople array not empty when Additional person is selected', () => {
      JSON.parse(addAllegationDataWithAdditionalPerAndFileRes).should.have.property('AdditionalPeople')
        .to.have.deep.equal([{FieldName: 'txpermoreallholder', FieldValue: [
          'Person Added IS =personAddFirstName:testb, personAddFamilyName:test',
          'Person Added IS =personAddFirstName:testc',
          'Person Added IS =personAddFirstName:testd, personAddFamilyName:test, personAddNickname:test, personAddDob:1985-02-01, personAddAgeRange:35-44, personAddNationality:Nationality-India, personAddGender:male'
        ]}]);
    });

    it('addAlligationData contain  url in Attachements when user upload a file', () => {
      JSON.parse(addAllegationDataWithAdditionalPerAndFileRes).should.have.property('Attachements')
        .to.have.deep.equal([{url: 'http://s3.com/foo/0.6035454156299347'}]);
    });
  });
});
