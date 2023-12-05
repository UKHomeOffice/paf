'use strict';
/* eslint-disable max-len */
const Controller = require('hof').controller;
const Behaviour = require('../../../apps/paf/behaviours/set-navigation-section');

describe('apps/paf/behaviours/set-navigation-section', () => {
  describe('getValues', () => {
    let controller;
    let req;
    let res;
    let sandbox;

    beforeEach(done => {
      req = reqres.req();
      res = reqres.res();
      req.sessionModel.attributes.steps = [];

      const GetSectionController = Behaviour(Controller);
      controller = new GetSectionController({ template: 'index', route: '/index' });
      controller._configure(req, res, done);
    });


    describe('sets the next page according to the section', () => {
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
            '/other-info-file-upload': {},
            '/add-other-info-file-upload': {},
            '/about-you-contact': {},
            '/are-you-eighteen': {}
          }
        };

        sandbox.stub(Controller.prototype, 'getValues').yieldsAsync();
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('the crime-location page has the next page as \'/report-person\'', () => {
        req.query.section = 'person';
        req.form.options.route = '/crime-location';
        controller.getValues(req, res, () => {
          const crimeLocationNext = req.form.options.steps['/crime-location'].next;
          crimeLocationNext.should.deep.equal('/report-person');
          req.form.options.next.should.deep.equal('/report-person');
        });
      });

      it('the crime-another-location page has the next page as \'/report-person\'', () => {
        req.query.section = 'person';
        req.form.options.route = '/crime-another-location';
        controller.getValues(req, res, () => {
          const crimeAnotherLocationNext = req.form.options.steps['/crime-another-location'].next;
          crimeAnotherLocationNext.should.deep.equal('/report-person');
          req.form.options.next.should.deep.equal('/report-person');
        });
      });

      it('the report-person page has the next page as \'/report-organisation\'', () => {
        req.query.section = 'organisation';
        req.form.options.route = '/report-person';
        controller.getValues(req, res, () => {
          const reportPersonNext = req.form.options.steps['/report-person'].next;
          reportPersonNext.should.deep.equal('/report-organisation');
          req.form.options.next.should.deep.equal('/report-organisation');
        });
      });

      it('the has-additionalPerson page has the next page as \'/report-organisation\'', () => {
        req.query.section = 'organisation';
        req.form.options.route = '/has-additionalPerson';
        controller.getValues(req, res, () => {
          const hasAdditionalPersonNext = req.form.options.steps['/has-additionalPerson'].next;
          hasAdditionalPersonNext.should.deep.equal('/report-organisation');
          req.form.options.next.should.deep.equal('/report-organisation');
        });
      });

      it('the person-details page has the next page as \'/report-organisation\'', () => {
        req.query.section = 'organisation';
        req.form.options.route = '/person-details';
        controller.getValues(req, res, () => {
          const personDetailsNext = req.form.options.steps['/person-details'].next;
          personDetailsNext.should.deep.equal('/report-organisation');
          req.form.options.next.should.deep.equal('/report-organisation');
        });
      });

      it('the report-organisation page has the next page as \'/other-info-description\'', () => {
        req.query.section = 'other-info';
        req.form.options.route = '/report-organisation';
        controller.getValues(req, res, () => {
          const reportOrganisationNext = req.form.options.steps['/report-organisation'].next;
          reportOrganisationNext.should.deep.equal('/other-info-description');
          req.form.options.next.should.deep.equal('/other-info-description');
        });
      });

      it('the another-company page has the next page as \'/other-info-description\'', () => {
        req.query.section = 'other-info';
        req.form.options.route = '/another-company';
        controller.getValues(req, res, () => {
          const anotherCompanyNext = req.form.options.steps['/another-company'].next;
          anotherCompanyNext.should.deep.equal('/other-info-description');
          req.form.options.next.should.deep.equal('/other-info-description');
        });
      });

      it('the other-info-file-upload page has the next page as \'/about-you\'', () => {
        req.query.section = 'about-you';
        req.form.options.route = '/other-info-file-upload';
        controller.getValues(req, res, () => {
          const otherInfoFileUploadNext = req.form.options.steps['/other-info-file-upload'].next;
          otherInfoFileUploadNext.should.deep.equal('/about-you');
          req.form.options.next.should.deep.equal('/about-you');
        });
      });

      it('the about-you-contact page has the next page as \'/confirm\'', () => {
        req.query.section = 'check-answers';
        req.form.options.route = '/about-you-contact';
        controller.getValues(req, res, () => {
          const aboutYouContactNext = req.form.options.steps['/about-you-contact'].next;
          aboutYouContactNext.should.deep.equal('/confirm');
          req.form.options.next.should.deep.equal('/confirm');
        });
      });

      it('the are-you-eighteen page has the next page as \'/confirm\'', () => {
        req.query.section = 'check-answers';
        req.form.options.route = '/are-you-eighteen';
        controller.getValues(req, res, () => {
          const areYouEighteenNext = req.form.options.steps['/are-you-eighteen'].next;
          areYouEighteenNext.should.deep.equal('/confirm');
          req.form.options.next.should.deep.equal('/confirm');
        });
      });
    });

    describe('sets the backlink for each section', () => {
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
            '/add-other-info-file-upload': {},
            '/about-you': {},
            '/about-you-contact': {},
            '/are-you-eighteen': {},
            '/confirm': {}
          }
        };

        sandbox.stub(Controller.prototype, 'getValues').yieldsAsync();
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('has the crime-location backlink for the report-person page', () => {
        req.form.options.route = '/report-person';
        req.sessionModel.attributes.steps.push('/crime-location');
        controller.getValues(req, res, () => {
          req.form.options.steps['/report-person'].backLink.should.deep.equal('crime-location');
          res.locals.backLink.should.deep.equal('crime-location');
        });
      });

      it('has the crime-another-location backlink for the report-person page', () => {
        req.form.options.route = '/report-person';
        req.sessionModel.attributes.steps.push('/crime-another-location');
        controller.getValues(req, res, () => {
          req.form.options.steps['/report-person'].backLink.should.deep.equal('crime-another-location');
          res.locals.backLink.should.deep.equal('crime-another-location');
        });
      });

      it('has the report-person backlink for the report-organisation page', () => {
        req.form.options.route = '/report-organisation';
        controller.getValues(req, res, () => {
          req.form.options.steps['/report-organisation'].backLink.should.deep.equal('report-person');
          res.locals.backLink.should.deep.equal('report-person');
        });
      });

      it('has the has-additionalPerson backlink for the report-organisation page', () => {
        req.form.options.route = '/report-organisation';
        req.sessionModel.attributes.steps.push('/has-additionalPerson');
        controller.getValues(req, res, () => {
          req.form.options.steps['/report-organisation'].backLink.should.deep.equal('has-additionalPerson');
          res.locals.backLink.should.deep.equal('has-additionalPerson');
        });
      });

      it('has the person-details backlink for the report-organisation page', () => {
        req.form.options.route = '/report-organisation';
        req.sessionModel.attributes.steps.push('/person-details');
        controller.getValues(req, res, () => {
          req.form.options.steps['/report-organisation'].backLink.should.deep.equal('person-details');
          res.locals.backLink.should.deep.equal('person-details');
        });
      });

      it('has the report-organisation backlink for the other-info-description page', () => {
        req.form.options.route = '/other-info-description';
        controller.getValues(req, res, () => {
          req.form.options.steps['/other-info-description'].backLink.should.deep.equal('report-organisation');
          res.locals.backLink.should.deep.equal('report-organisation');
        });
      });

      it('has the another-company backlink for the other-info-description page', () => {
        req.form.options.route = '/other-info-description';
        req.sessionModel.attributes.steps.push('/another-company');
        controller.getValues(req, res, () => {
          req.form.options.steps['/other-info-description'].backLink.should.deep.equal('another-company');
          res.locals.backLink.should.deep.equal('another-company');
        });
      });

      it('has the other-info-file-upload backlink for the about-you page', () => {
        req.form.options.route = '/about-you';
        req.sessionModel.attributes.steps.push('/other-info-file-upload');
        controller.getValues(req, res, () => {
          req.form.options.steps['/about-you'].backLink.should.deep.equal('other-info-file-upload');
          res.locals.backLink.should.deep.equal('other-info-file-upload');
        });
      });

      it('the add-other-info-file-upload page has the next page as \'/about-you\'', () => {
        req.query.section = 'about-you';
        req.form.options.route = '/add-other-info-file-upload';
        controller.getValues(req, res, () => {
          const addOtherInfoFileUploadNext = req.form.options.steps['/add-other-info-file-upload'].next;
          addOtherInfoFileUploadNext.should.deep.equal('/about-you');
          req.form.options.next.should.deep.equal('/about-you');
        });
      });

      it('has the about-you-contact backlink for the check answers page', () => {
        req.form.options.route = '/confirm';
        req.sessionModel.attributes.steps.push('/about-you-contact');
        controller.getValues(req, res, () => {
          req.form.options.steps['/confirm'].backLink.should.deep.equal('about-you-contact');
          res.locals.backLink.should.deep.equal('about-you-contact');
        });
      });

      it('has the are-you-eighteen backlink for the check answers page', () => {
        req.form.options.route = '/confirm';
        req.sessionModel.attributes.steps.push('/are-you-eighteen');
        controller.getValues(req, res, () => {
          req.form.options.steps['/confirm'].backLink.should.deep.equal('are-you-eighteen');
          res.locals.backLink.should.deep.equal('are-you-eighteen');
        });
      });
    });
  });

  describe('locals', () => {
    let controller;
    let req;
    let res;

    beforeEach(done => {
      req = reqres.req();
      res = reqres.res();
      const GetSectionController = Behaviour(Controller);
      controller = new GetSectionController({ template: 'index', route: '/index' });
      controller._configure(req, res, done);
    });


    describe('disables and enables sections links based on whether required crime type '
    + 'and crime children questions have been completed', () => {
      it('locals should not have enableSection property if all required fields not completed', () => {
        req.sessionModel.set('crime-type', undefined);
        req.sessionModel.set('immigration-crime-group', undefined);
        req.sessionModel.set('crime-children', undefined);
        controller.locals(req, res).should.not.have.property('enableSection');
      });


      it('locals should not have enableSection property if required crime-type '
      + 'toggle and crime-children fields not completed', () => {
        req.sessionModel.set('crime-type', 'immigration-crime');
        req.sessionModel.set('immigration-crime-group', undefined);
        req.sessionModel.set('crime-children', undefined);
        controller.locals(req, res).should.not.have.property('enableSection');
      });

      it('locals should not have enableSection property if required crime-children field not completed', () => {
        req.sessionModel.set('crime-type', 'immigration-crime');
        req.sessionModel.set('immigration-crime-group', 'immigration-crime-no-permission');
        req.sessionModel.set('crime-children', undefined);
        controller.locals(req, res).should.not.have.property('enableSection');
      });

      it('locals.enableSection is true if required fields are completed', () => {
        req.sessionModel.set('crime-type', 'immigration-crime');
        req.sessionModel.set('immigration-crime-group', 'immigration-crime-no-permission');
        req.sessionModel.set('crime-children', 'yes');
        controller.locals(req, res).should.have.property('enableSection')
          .and.deep.equal(true);
      });
    });
  });
});
