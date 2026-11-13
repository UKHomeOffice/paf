'use strict';

const Behaviour = require('../../../apps/paf/behaviours/time-formatter');

describe("apps/paf 'time-formatter' behaviour ", () => {
  class Base {
    constructor() {}
    configure() {}
  }

  let req;
  let res;
  let instance;
  const next = 'foo';

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });
  describe("The 'configure' method ", () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'configure').returns(req, res, next);
      instance = new (Behaviour(Base))();
    });

    it('should configure the time format', () => {
      req.sessionModel.set('time-crime-will-happen-hour', '11');
      req.sessionModel.set('time-crime-will-happen-minute', '15');

      instance.configure(req, res, next);
      expect(req.sessionModel.get('time-crime-will-happen')).to.equal('11 : 15 am');
    });

    it('should configures the am/pm suffix', () => {
      req.sessionModel.set('time-crime-will-happen-hour', '05');
      req.sessionModel.set('time-crime-will-happen-minute', '15');

      instance.configure(req, res, next);
      expect(req.sessionModel.get('time-crime-will-happen')).to.equal('05 : 15 am');

      req.sessionModel.set('time-crime-will-happen-hour', '13');

      instance.configure(req, res, next);
      expect(req.sessionModel.get('time-crime-will-happen')).to.equal('13 : 15 pm');
    });

    it('pads single-digit hours and minutes with a leading zero', () => {
      req.sessionModel.set('time-crime-will-happen-hour', '7');
      req.sessionModel.set('time-crime-will-happen-minute', '3');

      instance.configure(req, res, next);

      expect(req.sessionModel.get('time-crime-will-happen-hour')).to.equal('07');
      expect(req.sessionModel.get('time-crime-will-happen-minute')).to.equal('03');
      expect(req.sessionModel.get('time-crime-will-happen')).to.equal('07 : 03 am');
    });

    it('sets blank minutes to 00 when an hour is provided', () => {
      req.sessionModel.set('time-crime-will-happen-hour', '8');
      req.sessionModel.set('time-crime-will-happen-minute', '');

      instance.configure(req, res, next);

      expect(req.sessionModel.get('time-crime-will-happen-minute')).to.equal('00');
      expect(req.sessionModel.get('time-crime-will-happen')).to.equal('08 : 00 am');
    });

    it('unsets the combined time when no hour is provided and delegates to the base controller', () => {
      req.sessionModel.set('time-crime-will-happen-minute', '30');
      req.sessionModel.set('time-crime-will-happen', 'previous time');

      const result = instance.configure(req, res, next);

      expect(req.sessionModel.get('time-crime-will-happen')).to.be.undefined;
      expect(Base.prototype.configure).to.have.been.calledOnceWithExactly(req, res, next);
      expect(result).to.equal(req);
    });

    afterEach(() => {
      Base.prototype.configure.restore();
    });
  });

  describe("The 'locals' method", () => {
    it('adds the time change link for the crime duration section on the confirm route', () => {
      const timeField = { field: 'time-crime-will-happen' };
      const locals = {
        route: 'confirm',
        rows: [{
          section: 'The Crime - Duration',
          fields: [timeField, { field: 'another-field' }]
        }, {
          section: 'About you',
          fields: [{ field: 'about-you-first-name' }]
        }]
      };
      class LocalsBase {
        locals() {
          return locals;
        }
      }
      const LocalsController = Behaviour(LocalsBase);
      const localsController = new LocalsController();

      const result = localsController.locals({}, {});

      expect(result).to.equal(locals);
      expect(timeField.changeLink)
        .to.equal('/paf/date-time-crime-will-happen/edit#time-crime-will-happen-hour');
    });

    it('leaves time fields unchanged outside the confirm route', () => {
      const timeField = { field: 'time-crime-will-happen' };
      const locals = {
        route: 'date-time-crime-will-happen',
        rows: [{ section: 'The Crime - Duration', fields: [{ value: timeField }] }]
      };
      class LocalsBase {
        locals() {
          return locals;
        }
      }
      const LocalsController = Behaviour(LocalsBase);
      const localsController = new LocalsController();

      expect(localsController.locals({}, {})).to.equal(locals);
      expect(timeField).not.to.have.property('changeLink');
    });
  });
});
