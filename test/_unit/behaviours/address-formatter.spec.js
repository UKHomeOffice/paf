'use strict';

const Controller = require('hof').controller;
const Behaviour = require('../../../apps/paf/behaviours/address-formatter');

describe('apps/paf/behaviours/address-formatter', () => {
  describe('configure', () => {
    let controller;
    let req;
    let res;
    let sandbox;

    beforeEach(done => {

      req = reqres.req();
      res = reqres.res();
      req.sessionModel.attributes.steps = [];

      const AddressFormatterController = Behaviour(Controller);
      controller = new AddressFormatterController({ template: 'index', route: '/index' });
      controller._configure(req, res, done);
    });

    describe('concats separate address fields into one', () => {
      beforeEach(() => {
        sandbox = sinon.createSandbox();
        req.form.options = {
          steps: {
            '/crime-location': {},
            '/crime-another-location': {},
            '/report-person': {},
            '/has-additionalPerson': {},
            '/person-details': {},
            '/report-organisation': {},
            '/another-company': {},
            '/other-info-description': {},
            '/other-info-file-upload': {},
            '/about-you': {},
            '/about-you-contact': {},
            '/are-you-eighteen': {},
            '/confirm': {}
          }
        };

        sandbox.stub(Controller.prototype, 'configure').yieldsAsync();
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('configures the crime-location address', () => {
        req.sessionModel.set('crime-location-address-line1',  '1 Road Lane') 
        req.sessionModel.set('crime-location-address-line2', 'Mansion House')
        req.sessionModel.set('crime-location-address-town', 'London')
        req.sessionModel.set('crime-location-address-county', 'Greater London')
        controller.configure(req, res, () => {
          req.sessionModel.get('crime-location-address').should.deep.equal('1 Road Lane,Mansion House,London,Greater London');
        })
      });

      it('configures the crime-another-location address', () => {
        req.sessionModel.set('crime-another-location-address-line1',  '2 Road Lane') 
        req.sessionModel.set('crime-another-location-address-line2', 'Castle House')
        req.sessionModel.set('crime-another-location-address-town', 'London')
        req.sessionModel.set('crime-another-location-address-county', 'Greater London')
        controller.configure(req, res, () => {
          req.sessionModel.get('crime-another-location-address').should.deep.equal('2 Road Lane,Castle House,London,Greater London');
        })
      });

      it('configures the report-person-location-uk address', () => {
        req.sessionModel.set('report-person-location-uk-address-line1',  '3 Road Lane') 
        req.sessionModel.set('report-person-location-uk-address-line2', 'Cottage House')
        req.sessionModel.set('report-person-location-uk-address-town', 'Liverpool')
        req.sessionModel.set('report-person-location-uk-address-county', 'Merseyside')
        controller.configure(req, res, () => {
          req.sessionModel.get('report-person-location-uk-address').should.deep.equal('3 Road Lane,Cottage House,Liverpool,Merseyside');
        })
      });

      it('configures the report-person-location-outside-uk address', () => {
        req.sessionModel.set('report-person-location-outside-uk-address-line1',  'Passeig 1') 
        req.sessionModel.set('report-person-location-outside-uk-address-line2', 'Ciutadella')
        req.sessionModel.set('report-person-location-outside-uk-address-town', 'Barcelona')
        req.sessionModel.set('report-person-location-outside-uk-address-county', 'Catalonia')
        controller.configure(req, res, () => {
          req.sessionModel.get('report-person-location-outside-uk-address').should.deep.equal('Passeig 1,Ciutadella,Barcelona,Catalonia');
        })
      });

      it('configures the report-person-occupation-company address', () => {
        req.sessionModel.set('report-person-occupation-company-address-line1',  '4 Road Lane') 
        req.sessionModel.set('report-person-occupation-company-address-line2', 'Tower House')
        req.sessionModel.set('report-person-occupation-company-address-town', 'Leeds')
        req.sessionModel.set('report-person-occupation-company-address-county', 'East Midlands')
        controller.configure(req, res, () => {
          req.sessionModel.get('report-person-occupation-company-address').should.deep.equal('4 Road Lane,Tower House,Leeds,East Midlands');
        })
      });

      it('configures the report-person-study address', () => {
        req.sessionModel.set('report-person-study-address-line1',  '5 Road Lane') 
        req.sessionModel.set('report-person-study-address-line2', 'University of Warwick')
        req.sessionModel.set('report-person-study-address-town', 'Coventry')
        req.sessionModel.set('report-person-study-address-county', 'West Midlands')
        controller.configure(req, res, () => {
          req.sessionModel.get('report-person-study-address').should.deep.equal('5 Road Lane,University of Warwick,Coventry,West Midlands');
        })
      });

      it('configures the company-address address', () => {
        req.sessionModel.set('company-address-line1',  '6 Road Lane') 
        req.sessionModel.set('company-address-line2', 'Field House')
        req.sessionModel.set('company-town', 'Manchester')
        req.sessionModel.set('company-county', 'Greater Manchester')
        controller.configure(req, res, () => {
          req.sessionModel.get('company-address').should.deep.equal('6 Road Lane,Field House,Manchester,Greater Manchester');
        })
      });

     

    });
  });
});
