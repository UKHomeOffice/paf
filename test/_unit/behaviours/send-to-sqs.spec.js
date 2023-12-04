'use strict';
const { expect } = require('chai');
const proxyquire = require('proxyquire');

describe('SendToSQS', () => {
  let res;
  let req;
  let badReq;
  let badDataReq;
  let nextStub;
  let SendToSQS;
  let testSendToSQS;
  let addAllegationDataStub;
  let sendToQueueStub;
  let uuidStub;

  const testUuid = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';

  const allegationData = {
    data: 'test'
  };
  const badAllegationData = {
    data: 'error'
  };
  const testError = new Error('testError');

  class Base {}


  beforeEach(() => {
    req = {
      sessionModel: {
        attributes: 'test attributes'
      }
    };

    badReq = {
      sessionModel: {
        attributes: 'bad attributes'
      }
    };

    badDataReq = {
      sessionModel: {
        attributes: 'bad data'
      }
    };

    nextStub = sinon.stub();

    uuidStub = sinon.stub().returns(testUuid);

    addAllegationDataStub = sinon.stub().returns(allegationData);
    addAllegationDataStub.withArgs(badReq.sessionModel.attributes).throws(testError);
    addAllegationDataStub.withArgs(badDataReq.sessionModel.attributes).returns(badAllegationData);

    sendToQueueStub = sinon.stub();
    sendToQueueStub.withArgs(allegationData, testUuid).resolves();
    sendToQueueStub.withArgs(badAllegationData, testUuid).rejects(testError);

    const Behaviour = proxyquire('../../../apps/paf/behaviours/send-to-sqs', {
      '../../../lib/utils': {
        sendToQueue: sendToQueueStub
      },
      uuid: {
        v4: uuidStub
      },
      '../../../lib/add-allegation-data': {
        addAllegationData: addAllegationDataStub
      }
    });

    SendToSQS = Behaviour(Base);
    testSendToSQS = new SendToSQS();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('saveValues', () => {
    describe('If valid allegation data', () => {
      it('addAllegationData should have been called once with sessionModel attributes', () => {
        testSendToSQS.saveValues(req, res, nextStub);
        expect(addAllegationDataStub).to.have.been.calledOnceWith(req.sessionModel.attributes);
      });

      it('sendToQueue should be called once with allegation data', () => {
        testSendToSQS.saveValues(req, res, nextStub);
        expect(sendToQueueStub).to.have.been.calledOnceWith(allegationData);
      });

      it('next should be called once with no arguments', () => {
        testSendToSQS.saveValues(req, res, nextStub)
          .then(() => {
            expect(nextStub).to.have.been.calledOnceWith();
          });
      });
    });

    describe('If invalid allegation data', () => {
      it('should pass the error to the next middleware', () => {
        testSendToSQS.saveValues(badReq, res, nextStub);
        expect(nextStub).to.have.been.calledOnceWith(testError);
      });

      it('should add formNotSubmitted flag to the error', () => {
        testSendToSQS.saveValues(badReq, res, nextStub);
        expect(testError.formNotSubmitted).to.eql(true);
      });
    });

    describe('If sendToQueue rejects', () => {
      it('should pass the error to the next middleware', () => {
        testSendToSQS.saveValues(badDataReq, res, nextStub)
          .then(() => {
            expect(nextStub).to.have.been.calledOnceWith(testError);
          });
      });

      it('should add formNotSubmitted flag to the error', () => {
        testSendToSQS.saveValues(badDataReq, res, nextStub)
          .then(() => {
            expect(testError.formNotSubmitted).to.eql(true);
          });
      });
    });
  });
});
