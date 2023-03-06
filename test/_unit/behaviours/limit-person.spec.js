'use strict';

const Controller = require('hof').controller;
const Behaviour = require('../../../apps/paf/behaviours/limit-person');

describe('apps/paf/behaviours/limit-person', () => {
  describe('locals', () => {
    let controller;
    let req;
    let res;

    beforeEach(done => {
      req = reqres.req();
      res = reqres.res();
      const LimitPersonController = Behaviour(Controller);
      controller = new LimitPersonController({ template: 'index', route: '/index' });
      controller._configure(req, res, done);
    });

    describe('limit additional people', () => {

      it('locals should not have noMorePersons property if additional people is less then 6', () => {
        req.sessionModel.set('persons', {
          aggregatedValues: [
            { itemTitle: 'Person 1', fields: [Array] },
            { itemTitle: 'Person 2', fields: [Array] },
          ]
        })
        controller.locals(req, res).should.not.have.property('noMorePersons')
      });

      it('locals.noMorePersons is true if additional people is equal to or more then 6', () => {
        req.sessionModel.set('persons', {
          aggregatedValues: [
            { itemTitle: 'Person 1', fields: [Array] },
            { itemTitle: 'Person 2', fields: [Array] },
            { itemTitle: 'Person 3', fields: [Array] },
            { itemTitle: 'Person 4', fields: [Array] },
            { itemTitle: 'Person 5', fields: [Array] },
            { itemTitle: 'Person 6', fields: [Array] }
          ]
        })
        controller.locals(req, res).should.have.property('noMorePersons')
          .and.deep.equal(true);
      });
    });
  });
});
