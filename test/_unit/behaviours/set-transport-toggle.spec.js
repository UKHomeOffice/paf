/* eslint-disable max-len */
'use strict';

const Controller = require('hof').controller;
const Behaviour = require('../../../apps/paf/behaviours/set-transport-toggle');

describe('apps/paf/behaviours/set-transport-toggle', () => {
  describe('locals', () => {
    let controller;
    let req;
    let res;

    beforeEach(done => {
      req = reqres.req();
      res = reqres.res();
      const TransportToggleController = Behaviour(Controller);
      controller = new TransportToggleController({ template: 'index', route: '/index' });
      controller._configure(req, res, done);
    });

    describe('crime transport group toggled options should be checked if selected', () => {
      it('locals should have carChecked property as true if car has been selected', () => {
        req.form.values['crime-car-group'] = 'car';
        controller.locals(req, res).should.have.property('carChecked').and.deep.equal(true);
      });
      it('locals should have carTransporterChecked property as true if car transporter has been selected', () => {
        req.form.values['crime-car-group'] = 'car-transporter';
        controller.locals(req, res).should.have.property('carTransporterChecked').and.deep.equal(true);
      });
      it('locals should have hgvCSChecked property as true if hgv canvas sided has been selected', () => {
        req.form.values['crime-hgv-group'] = 'hgv-canvas-sided';
        controller.locals(req, res).should.have.property('hgvCSChecked').and.deep.equal(true);
      });
      it('locals should have hgvFChecked property as true if hgv flatbed has been selected', () => {
        req.form.values['crime-hgv-group'] = 'hgv-flatbed';
        controller.locals(req, res).should.have.property('hgvFChecked').and.deep.equal(true);
      });
      it('locals should have hgvHSChecked property as true if hgv hard sided has been selected', () => {
        req.form.values['crime-hgv-group'] = 'hgv-hard-sided';
        controller.locals(req, res).should.have.property('hgvHSChecked').and.deep.equal(true);
      });
      it('locals should have hgvRChecked property as true if hgv refridgerated has been selected', () => {
        req.form.values['crime-hgv-group'] = 'hgv-refridgerated';
        controller.locals(req, res).should.have.property('hgvRChecked').and.deep.equal(true);
      });
      it('locals should have hgvTCheckedproperty as true if hgv tanker has been selected', () => {
        req.form.values['crime-hgv-group'] = 'hgv-tanker';
        controller.locals(req, res).should.have.property('hgvTChecked').and.deep.equal(true);
      });
      it('locals should have lorryChecked property as true if lorry has been selected', () => {
        req.form.values['crime-lorry-group'] = 'lorry';
        controller.locals(req, res).should.have.property('lorryChecked').and.deep.equal(true);
      });
      it('locals should have lorryDragChecked property as true if lorry and drag has been selected', () => {
        req.form.values['crime-lorry-group'] = 'lorry-and-drag';
        controller.locals(req, res).should.have.property('lorryDragChecked').and.deep.equal(true);
      });
      it('locals should have vanChecked property as true if van has been selected', () => {
        req.form.values['crime-van-group'] = 'van';
        controller.locals(req, res).should.have.property('vanChecked').and.deep.equal(true);
      });
      it('locals should have vanTrailerChecked property as true if van and trailer has been selected', () => {
        req.form.values['crime-van-group'] = 'van-and-trailer';
        controller.locals(req, res).should.have.property('vanTrailerChecked').and.deep.equal(true);
      });
      it('locals should have vanOtherChecked property as true if car van - other has been selected', () => {
        req.form.values['crime-van-group'] = 'van-other';
        controller.locals(req, res).should.have.property('vanOtherChecked').and.deep.equal(true);
      });
      it('locals should have sevenVanChecked property as true if 7.5 tonne van has been selected', () => {
        req.form.values['crime-van-group'] = 'seven-point-five-tonne-van';
        controller.locals(req, res).should.have.property('sevenVanChecked').and.deep.equal(true);
      });
      it('locals should have bulkChecked property as true if bulk carrier has been selected', () => {
        req.form.values['crime-carrier-group'] = 'bulk-carrier';
        controller.locals(req, res).should.have.property('bulkChecked').and.deep.equal(true);
      });
      it('locals should have vehicleChecked property as true if vehicle carrier has been selected', () => {
        req.form.values['crime-carrier-group'] = 'vehicle-carrier';
        controller.locals(req, res).should.have.property('vehicleChecked').and.deep.equal(true);
      });
      it('locals should have vesselChecked property as true if vessel carrier has been selected', () => {
        req.form.values['crime-carrier-group'] = 'vessel-carrier';
        controller.locals(req, res).should.have.property('vesselChecked').and.deep.equal(true);
      });
      it('locals should have generalChecked property as true if general cargo has been selected', () => {
        req.form.values['crime-general-cargo-group'] = 'general-cargo';
        controller.locals(req, res).should.have.property('generalChecked').and.deep.equal(true);
      });
      it('locals should have generalContainerChecked property as true if general cargo with container capacity has been selected', () => {
        req.form.values['crime-general-cargo-group'] = 'general-cargo-with-container-capacity';
        controller.locals(req, res).should.have.property('generalContainerChecked').and.deep.equal(true);
      });
      it('locals should have researchChecked property as true if research vessel has been selected', () => {
        req.form.values['crime-vessel-group'] = 'research-vessel';
        controller.locals(req, res).should.have.property('researchChecked').and.deep.equal(true);
      });
      it('locals should have supplyChecked property as true if supply vessel has been selected', () => {
        req.form.values['crime-vessel-group'] = 'supply-vessel';
        controller.locals(req, res).should.have.property('supplyChecked').and.deep.equal(true);
      });
      it('locals should have supportChecked property as true if support vessel has been selected', () => {
        req.form.values['crime-vessel-group'] = 'support-vessel';
        controller.locals(req, res).should.have.property('supportChecked').and.deep.equal(true);
      });
    });

    describe('report person transport group toggled options should be checked if selected', () => {
      it('locals should have personCarChecked property as true if car has been selected', () => {
        req.form.values['report-person-transport-car-group'] = 'car';
        controller.locals(req, res).should.have.property('personCarChecked').and.deep.equal(true);
      });
      it('locals should have personCarTransporterChecked property as true if car transporter has been selected', () => {
        req.form.values['report-person-transport-car-group'] = 'car-transporter';
        controller.locals(req, res).should.have.property('personCarTransporterChecked').and.deep.equal(true);
      });
      it('locals should have personHgvCSChecked property as true if hgv canvas sided has been selected', () => {
        req.form.values['report-person-transport-hgv-group'] = 'hgv-canvas-sided';
        controller.locals(req, res).should.have.property('personHgvCSChecked').and.deep.equal(true);
      });
      it('locals should have personHgvFChecked property as true if hgv flatbed has been selected', () => {
        req.form.values['report-person-transport-hgv-group'] = 'hgv-flatbed';
        controller.locals(req, res).should.have.property('personHgvFChecked').and.deep.equal(true);
      });
      it('locals should have personHgvHSChecked property as true if hgv hard sided has been selected', () => {
        req.form.values['report-person-transport-hgv-group'] = 'hgv-hard-sided';
        controller.locals(req, res).should.have.property('personHgvHSChecked').and.deep.equal(true);
      });
      it('locals should have personHgvRChecked property as true if hgv refridgerated has been selected', () => {
        req.form.values['report-person-transport-hgv-group'] = 'hgv-refridgerated';
        controller.locals(req, res).should.have.property('personHgvRChecked').and.deep.equal(true);
      });
      it('locals should have personHgvTChecked property as true if hgv tanker has been selected', () => {
        req.form.values['report-person-transport-hgv-group'] = 'hgv-tanker';
        controller.locals(req, res).should.have.property('personHgvTChecked').and.deep.equal(true);
      });
      it('locals should have personLorryChecked property as true if lorry has been selected', () => {
        req.form.values['report-person-transport-lorry-group'] = 'lorry';
        controller.locals(req, res).should.have.property('personLorryChecked').and.deep.equal(true);
      });
      it('locals should have personLorryDragChecked property as true if lorry and drag has been selected', () => {
        req.form.values['report-person-transport-lorry-group'] = 'lorry-and-drag';
        controller.locals(req, res).should.have.property('personLorryDragChecked').and.deep.equal(true);
      });
      it('locals should have personVanChecked property as true if van has been selected', () => {
        req.form.values['report-person-transport-van-group'] = 'van';
        controller.locals(req, res).should.have.property('personVanChecked').and.deep.equal(true);
      });
      it('locals should have personVanTrailerChecked property as true if van and trailer has been selected', () => {
        req.form.values['report-person-transport-van-group'] = 'van-and-trailer';
        controller.locals(req, res).should.have.property('personVanTrailerChecked').and.deep.equal(true);
      });
      it('locals should have personVanOtherChecked property as true if car van-other has been selected', () => {
        req.form.values['report-person-transport-van-group'] = 'van-other';
        controller.locals(req, res).should.have.property('personVanOtherChecked').and.deep.equal(true);
      });
      it('locals should have personSevenVanChecked property as true if 7.5 tonne van has been selected', () => {
        req.form.values['report-person-transport-van-group'] = 'seven-point-five-tonne-van';
        controller.locals(req, res).should.have.property('personSevenVanChecked').and.deep.equal(true);
      });
    });
  });
});
