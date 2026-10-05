'use strict';

const { expect } = require('chai');
const Behaviour = require('../../../apps/paf/behaviours/unset-crime-country');

describe('apps/paf/behaviours/unset-crime-country', () => {
  it('unsets both crime country values and delegates getValues to the superclass', () => {
    const baseResult = { values: 'from superclass' };

    class BaseController {
      getValues(...args) {
        this.receivedArgs = args;
        return baseResult;
      }
    }

    const CrimeCountryController = Behaviour(BaseController);
    const controller = new CrimeCountryController();
    const req = { sessionModel: { unset: sinon.spy() } };
    const res = {};
    const next = sinon.spy();

    const result = controller.getValues(req, res, next);

    expect(req.sessionModel.unset.callCount).to.equal(2);
    expect(req.sessionModel.unset.firstCall.args).to.deep.equal(['crime-location-country']);
    expect(req.sessionModel.unset.secondCall.args).to.deep.equal(['crime-another-location-country']);
    expect(controller.receivedArgs).to.deep.equal([req, res, next]);
    expect(result).to.equal(baseResult);
  });
});
