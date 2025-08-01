
describe('Server.js app file', () => {
  let hofStub;
  let useStub;
  let sendStub;
  let appsCommonStub;
  let appsPafStub;
  let behavioursSetNavigationSectionStub;
  let behavioursTimeFormatterStub;
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = request();
    req.session = {};
    req.body = {
      appName: 'testApp',
      sessionProperties: {
        testProp1: 'test',
        testProp2: 'test'
      }
    };

    res = response();
    sendStub = sinon.stub();
    res.send = sendStub;
    next = sinon.stub();
    hofStub = sinon.stub();
    useStub = sinon.stub();
    appsCommonStub = sinon.stub();
    appsPafStub = sinon.stub();
    behavioursSetNavigationSectionStub = sinon.stub();
    behavioursTimeFormatterStub = sinon.stub();

    useStub.onCall(0).yields(req, res, next);
    useStub.onCall(1).yields(req, res);
    hofStub.returns({ use: useStub });

    proxyquire('../server', {
      hof: hofStub,
      './apps/common': appsCommonStub,
      './apps/paf': appsPafStub,
      './apps/paf/behaviours/set-navigation-section': behavioursSetNavigationSectionStub,
      './apps/paf/behaviours/time-formatter': behavioursTimeFormatterStub,
      './config': { env: 'test' }
    });
  });

  describe('Setup HOF Configuration', () => {
    it('calls hof with a suitable config', () => {
      hofStub.should.have.been.calledOnce.calledWith(sinon.match({
        appName: sinon.match.string,
        theme: sinon.match.string,
        routes: sinon.match.array,
        behaviours: sinon.match.array,
        session: sinon.match.object,
        getAccessibility: sinon.match(function (value) { // Note: getAccessibility is now deprecated in hof
          return value === undefined || typeof value === 'boolean';
        }, 'getAccessibility should be undefined or a boolean')
      }));
    });

    it('should call the app use method three times if env set to test', () => {
      useStub.callCount.should.equal(3);
    });

    it('should call the app use method three times if env set to development', () => {
      const use = sinon.stub();
      const hof = () => ({ use });

      proxyquire('../server', {
        hof: hof,
        './config': { env: 'development' }
      });

      useStub.callCount.should.equal(3);
    });

    it('should call the app use method two times if env set to anything else', () => {
      const use = sinon.stub();
      const hof = () => ({ use });

      proxyquire('../server', {
        hof: hof,
        './config': { env: 'production' }
      });

      use.should.have.been.calledTwice;
    });
  });

  describe('Use Locals', () => {
    it('should set locals on the response', () => {
      res.locals.should.eql({
        htmlLang: 'en'
      });
    });

    it('should call next once', () => {
      next.should.have.been.calledOnce;
    });
  });

  describe('Use Test Endpoint', () => {
    it('it should take /test/bootstrap-session as the first argument', () => {
      const useArgs = useStub.getCall(1).args[0];
      useArgs.should.eql('/test/bootstrap-session');
    });

    it('the send method on res should be called', () => {
      sendStub.should.have.been.calledOnce.calledWithExactly('Session populate complete');
    });

    it('if no app name key set but a redis session is available set the app name key to an empty object', () => {
      expect(req.session['hof-wizard-testApp']).to.exist;
    });

    it('if session properties are set in the body they are set on hof-wizard-appName', () => {
      req.session['hof-wizard-testApp'].should.eql(
        {
          testProp1: 'test',
          testProp2: 'test'
        }
      );
    });
  });
});
