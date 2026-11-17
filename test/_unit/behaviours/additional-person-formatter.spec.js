'use strict';

const Behaviour = require('../../../apps/paf/behaviours/additional-person-formatter');

describe('apps/paf/behaviours/additional-person-formatter', () => {
  let controller;
  let req;
  let res;
  let next;
  let configureResult;

  beforeEach(() => {
    configureResult = {};

    class BaseController {
      configure(...args) {
        this.configureArgs = args;
        return configureResult;
      }
    }

    const AdditionalPersonFormatterController = Behaviour(BaseController);
    controller = new AdditionalPersonFormatterController();
    req = { sessionModel: { get: sinon.stub(), set: sinon.spy(), unset: sinon.spy() } };
    res = {};
    next = sinon.spy();
  });

  it('unsets persons when no additional-person data exists and calls superclass configure', () => {
    req.sessionModel.get.withArgs('persons').returns(undefined);

    const result = controller.configure(req, res, next);

    req.sessionModel.unset.should.have.been.calledWithExactly('persons');
    req.sessionModel.set.should.not.have.been.called;
    controller.configureArgs.should.deep.equal([req, res, next]);
    result.should.equal(configureResult);
  });

  it('maps person fields and values, omits empty values, and calls superclass configure', () => {
    req.sessionModel.get.withArgs('persons').returns({
      aggregatedValues: [
        {
          fields: [
            { field: 'report-person-gender', value: 'female' },
            { field: 'report-person-first-name', value: 'Alice' },
            { field: 'report-person-family-name', value: '' }
          ]
        },
        {
          fields: [
            { field: 'report-person-gender', value: 'unmapped-gender' },
            { field: 'report-person-first-name', value: 'Bob' }
          ]
        }
      ]
    });

    const result = controller.configure(req, res, next);

    req.sessionModel.set.should.have.been.calledTwice;
    req.sessionModel.set.lastCall.args.should.deep.equal([
      'persons',
      [
        [
          { Key: 'personsex', StringValue: 'Female' },
          { Key: 'personname', StringValue: 'Alice' }
        ],
        [
          { Key: 'personsex', StringValue: 'unmapped-gender' },
          { Key: 'personname', StringValue: 'Bob' }
        ]
      ]
    ]);
    req.sessionModel.unset.should.not.have.been.called;
    controller.configureArgs.should.deep.equal([req, res, next]);
    result.should.equal(configureResult);
  });
});
