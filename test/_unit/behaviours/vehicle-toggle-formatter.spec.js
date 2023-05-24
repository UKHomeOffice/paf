'use strict';

const Controller = require('hof').controller;
const Behaviour = require('../../../apps/paf/behaviours/vehicle-toggle-formatter');

describe('apps/paf/behaviours/vehicle-toggle-formatter', () => {
  describe('process', () => {
    let controller;
    let req;
    let res;
    let sandbox;

    beforeEach(done => {

      req = reqres.req();
      res = reqres.res();
      req.sessionModel.attributes.steps = [];

      const VehicleToggleFormatterController = Behaviour(Controller);
      controller = new VehicleToggleFormatterController({ template: 'index', route: '/index' });
      controller._configure(req, res, done);
    });

    describe('formats vehicle-type, boat-type and report-person-transport-type that come from radio toggle', () => {
      beforeEach(() => {
        sandbox = sinon.createSandbox();

        sandbox.stub(Controller.prototype, 'process').yieldsAsync();
      });

      afterEach(() => {
        sandbox.restore();
      });

      it(`sets 'car' as vehicle-type`, () => {
        req.sessionModel.set('crime-car-group',  'car' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('car');
        })
      });
      
      it(`sets 'car-transporter' as vehicle-type`, () => {
        req.sessionModel.set('crime-car-group',  'car-transporter' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('car-transporter');
        })
      });

      it(`sets 'hgv-canvas-sided' as vehicle-type`, () => {
        req.sessionModel.set('crime-hgv-group',  'hgv-canvas-sided' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('hgv-canvas-sided');
        })
      });

      it(`sets 'hgv-flatbed' as vehicle-type`, () => {
        req.sessionModel.set('crime-hgv-group',  'hgv-flatbed' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('hgv-flatbed');
        })
      });

      it(`sets 'hgv-hard-sided' as vehicle-type`, () => {
        req.sessionModel.set('crime-hgv-group',  'hgv-hard-sided' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('hgv-hard-sided');
        })
      });

      it(`sets 'hgv-fridgerated' as vehicle-type`, () => {
        req.sessionModel.set('crime-hgv-group',  'hgv-fridgerated' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('hgv-fridgerated');
        })
      });

      it(`sets 'lorry' as vehicle-type`, () => {
        req.sessionModel.set('crime-lorry-group',  'lorry' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('lorry');
        })
      });

      it(`sets 'lorry-drag' as vehicle-type`, () => {
        req.sessionModel.set('crime-lorry-group',  'lorry-and-drag' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('lorry-and-drag');
        })
      });

      it(`sets 'van' as vehicle-type`, () => {
        req.sessionModel.set('crime-van-group',  'van' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('van');
        })
      });

      it(`sets 'van-and-trailer' as vehicle-type`, () => {
        req.sessionModel.set('crime-van-group',  'van-and-trailer' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('van-and-trailer');
        })
      });

      it(`sets 'van-other' as vehicle-type`, () => {
        req.sessionModel.set('crime-van-group',  'van-other' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('van-other');
        })
      });

      it(`sets 'seven-point-five-tonne-van' as vehicle-type`, () => {
        req.sessionModel.set('crime-van-group',  'seven-point-five-tonne-van' );
        controller.process(req, res, () => {
          req.sessionModel.get('vehicle-type').should.deep.equal('seven-point-five-tonne-van');
        })
      });

      it(`sets 'bulk-carrier' as vehicle-type`, () => {
        req.sessionModel.set('crime-carrier-group', 'bulk-carrier' );
        controller.process(req, res, () => {
          req.sessionModel.get('boat-type').should.deep.equal('bulk-carrier');
        })
      });

      it(`sets 'vehicle carrier' as vehicle-type`, () => {
        req.sessionModel.set('crime-carrier-group', 'vehicle-carrier' );
        controller.process(req, res, () => {
          req.sessionModel.get('boat-type').should.deep.equal('vehicle-carrier');
        })
      });

      it(`sets 'vessel carrier' as boat-type`, () => {
        req.sessionModel.set('crime-carrier-group', 'vessel-carrier' );
        controller.process(req, res, () => {
          req.sessionModel.get('boat-type').should.deep.equal('vessel-carrier');
        })
      });

      it(`sets 'general-cargo' as boat-type`, () => {
        req.sessionModel.set('crime-general-cargo-group', 'general-cargo' );
        controller.process(req, res, () => {
          req.sessionModel.get('boat-type').should.deep.equal('general-cargo');
        })
      });

      it(`sets 'general-cargo-with-container-capacity' as boat-type`, () => {
        req.sessionModel.set('crime-general-cargo-group', 'general-cargo-with-container-capacity' );
        controller.process(req, res, () => {
          req.sessionModel.get('boat-type').should.deep.equal('general-cargo-with-container-capacity');
        })
      });

      it(`sets 'research-vessel' as boat-type`, () => {
        req.sessionModel.set('crime-vessel-group',  'research-vessel' );
        controller.process(req, res, () => {
          req.sessionModel.get('boat-type').should.deep.equal('research-vessel');
        })
      });

      it(`sets 'supply-vessel' as boat-type`, () => {
        req.sessionModel.set('crime-vessel-group', 'supply-vessel' );
        controller.process(req, res, () => {
          req.sessionModel.get('boat-type').should.deep.equal('supply-vessel');
        })
      });

      it(`sets 'support-vessel' as boat-type`, () => {
        req.sessionModel.set('crime-vessel-group', 'support-vessel' );
        controller.process(req, res, () => {
          req.sessionModel.get('boat-type').should.deep.equal('support-vessel');
        })
      });

      it(`sets 'car' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-car-group',  'car' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('car');
        })
      });

      it(`sets 'car-transporter' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-car-group',  'car-transporter' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('car-transporter');
        })
      });
      
      it(`sets 'hgv-canvas-sided' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-hgv-group', 'hgv-canvas-sided' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('hgv-canvas-sided');
        })
      });

      it(`sets 'hgv-flatbed' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-hgv-group', 'hgv-flatbed' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('hgv-flatbed');
        })
      });

      it(`sets 'hgv-hard-sided' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-hgv-group', 'hgv-hard-sided' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('hgv-hard-sided');
        })
      });

      it(`sets 'hgv-fridgerated' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-hgv-group', 'hgv-fridgerated' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('hgv-fridgerated');
        })
      });

      it(`sets 'lorry' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-lorry-group', 'lorry' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('lorry');
        })
      });

      it(`sets 'lorry-drag' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-lorry-group', 'lorry-and-drag' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('lorry-and-drag');
        })
      });

      it(`sets 'van' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-van-group', 'van' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('van');
        })
      });

      it(`sets 'van-and-trailer' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-van-group', 'van-and-trailer' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('van-and-trailer');
        })
      });

      it(`sets 'van-other' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-van-group', 'van-other' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('van-other');
        })
      });

      it(`sets 'seven-point-five-tonne-van' as report-person-transport-type`, () => {
        req.sessionModel.set('report-person-transport-van-group', 'seven-point-five-tonne-van' );
        controller.process(req, res, () => {
          req.sessionModel.get('report-person-transport-type').should.deep.equal('seven-point-five-tonne-van');
        })
      });
    });
  });
});
