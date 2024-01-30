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

    afterEach(() => {
      Base.prototype.configure.restore();
    });
  });
});
