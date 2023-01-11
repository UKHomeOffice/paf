'use strict';

const Controller = require('hof').controller;
const Behaviour = require('../../../apps/paf/behaviours/transport-behaviour');

describe('apps/paf/behaviours/transport-behaviour', () => {
  describe('saveValues', () => {
    let controller;
    let req;
    let res;

    beforeEach(done => {
      req = reqres.req();
      res = reqres.res();
      const TransportBehaviourController = Behaviour(Controller);
      controller = new TransportBehaviourController({ template: 'index', route: '/index' });
      controller._configure(req, res, done);
    });

    describe('.saveValues()', () => {
      let sandbox;

      beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Controller.prototype, 'saveValues').yieldsAsync();
        req.form.values['transport-group'] = [
          'crime-transport-vehicle',
          'crime-transport-boat',
          'crime-transport-train',
          'crime-transport-aeroplane'
        ]
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('removes values for crime-transport-vehicle that are not checked and have unchecked counterparts', () => {
        sandbox.stub(req.sessionModel, 'unset');
  
        req.form.values['transport-group'][0] = '';
        req.form.values['vehicle-type'] = 'Benz';
        req.form.values['vehicle-make'] = 'C-class';
        req.form.values['vehicle-model'] = '2000';
        req.form.values['vehicle-colour'] = 'Black';
        req.form.values['vehicle-registration'] = 'MRVL1';

        controller.saveValues(req, res, () => {
          console.log(req.sessionModel)
          req.sessionModel.unset.should.have.been.calledWithExactly([
            'vehicle-type',
            'vehicle-make',
            'vehicle-model',
            'vehicle-colour',
            'vehicle-registration'
          ]);
        });
      });

      it('removes values for boat-transport-vehicle that are not checked and have unchecked counterparts', () => {
        sandbox.stub(req.sessionModel, 'unset');
  
        req.form.values['transport-group'][1] = '';
        req.form.values['boat-type'] = 'yacht';
        req.form.values['boat-name'] = 'Boaty';
        req.form.values['boat-country-departure'] = 'France';
        req.form.values['port-departure'] = 'Port1';
        req.form.values['port-arrival'] = 'Port4';
        req.form.values['port-departure-time'] = '9am';
        req.form.values['port-arrival-time'] = '8pm';

        controller.saveValues(req, res, () => {
          console.log(req.sessionModel)
          req.sessionModel.unset.should.have.been.calledWithExactly([
            'boat-type',
            'boat-name',
            'boat-country-departure',
            'port-departure',
            'port-arrival',
            'port-departure-time',
            'port-arrival-time'
          ]);
        });
      });

      it('removes values for train-transport-vehicle that are not checked and have unchecked counterparts', () => {
        sandbox.stub(req.sessionModel, 'unset');
  
        req.form.values['transport-group'][2] = '';
        req.form.values['train-company'] = 'Eurostar';
        req.form.values['train-country-departure'] = 'Belgium';
        req.form.values['station-departure'] = 'Brussels';
        req.form.values['station-arrival'] = 'St Pancras';
        req.form.values['station-departure-time'] = '2pm';
        req.form.values['station-arrival-time'] = '3pm';

        controller.saveValues(req, res, () => {
          console.log(req.sessionModel)
          req.sessionModel.unset.should.have.been.calledWithExactly([
            'train-company',
            'train-country-departure',
            'station-departure',
            'station-arrival',
            'station-departure-time',
            'station-arrival-time'
          ]);
        });
      });

      it('removes values for aeroplane-transport-vehicle that are not checked and have unchecked counterparts', () => {
        sandbox.stub(req.sessionModel, 'unset');
  
        req.form.values['transport-group'][3] = '';
        req.form.values['airline-company'] = 'British Airways';
        req.form.values['airline-flight-number'] = 'BA0001';
        req.form.values['airline-country-departure'] = 'Spain';
        req.form.values['airport-departure'] = 'Barcelona El Prat';
        req.form.values['airport-arrival'] = 'London Heathrow';
        req.form.values['airport-departure-time'] = '5pm';
        req.form.values['airport-arrival-time'] = '7pm';

        controller.saveValues(req, res, () => {
          console.log(req.sessionModel)
          req.sessionModel.unset.should.have.been.calledWithExactly([
            'airline-company',
            'airline-flight-number',
            'airline-country-departure',
            'airport-departure',
            'airport-arrival',
            'airport-departure-time',
            'airport-arrival-time'
          ]);
        });
      });
    });

  });
});
