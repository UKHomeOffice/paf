/* eslint-disable max-len */
const AggregatorBehaviour = require('../../../apps/paf/behaviours/aggregator');
const Model = require('hof').model;

describe('aggregator behaviour', () => {
  class Base {
  }

  let behaviour;
  let Behaviour;
  let req;
  let res;
  let next;

  describe('aggregator', () => {
    let superGetValuesStub;
    let superLocalsStub;

    beforeEach(() => {
      req = request();
      res = response();

      req.sessionModel = new Model({});
      req.form.options = {
        aggregateFrom: ['personAddNumber',
          'personAddFirstName',
          'personAddFamilyName',
          'personAddNickname',
          'personAddDob',
          'personAddAgeRange',
          'personAddNationality',
          'personAddGender',
          'personAddPassport',
          'personAddId',
          'personAddNi'],
        aggregateTo: 'persons',
        addStep: 'add-person',
        route: '/person-details',
        addAnotherLinkText: 'person',
        fieldsConfig: {
          personAddNumber: {},
          personAddFirstName: {},
          personAddFamilyName: {},
          personAddNickname: {},
          personAddDob: {},
          personAddAgeRange: {},
          personAddNationality: {},
          personAddGender: {},
          personAddPassport: {},
          personAddId: {},
          personAddNi: {}
        }
      };
      req.baseUrl = '/test';

      superGetValuesStub = sinon.stub();
      superLocalsStub = sinon.stub();
      Base.prototype.getValues = superGetValuesStub;
      Base.prototype.locals = superLocalsStub;
      next = sinon.stub();

      Behaviour = AggregatorBehaviour(Base);
      behaviour = new Behaviour(req.form.options);
      behaviour.confirmStep = '/confirm';
    });

    describe('#getValues actions', () => {
      beforeEach(() => {
        behaviour.handleAction = sinon.stub();
      });

      it('sends the delete action when url action is delete', () => {
        req.params.action = 'delete';
        behaviour.getValues(req, res, next);

        behaviour.handleAction.should.be.calledOnceWithExactly(req, res, next, 'delete');
      });

      it('sends the edit action when url action is edit', () => {
        req.params.action = 'edit';
        behaviour.getValues(req, res, next);

        behaviour.handleAction.should.be.calledOnceWithExactly(req, res, next, 'edit');
      });

      it('sends the addItem action when url action is missing, but new fields to add are present, ' +
        'and no elements exist', () => {
        req.form.options.aggregateFrom = ['personAddNumber',
          'personAddFirstName',
          'personAddFamilyName',
          'personAddNickname',
          'personAddDob',
          'personAddAgeRange',
          'personAddNationality',
          'personAddGender',
          'personAddPassport',
          'personAddId',
          'personAddNi'];

        req.sessionModel.set('personAddFirstName', 'Ronald');
        req.sessionModel.set('personAddFamilyName', 'Testman');

        behaviour.getValues(req, res, next);

        behaviour.handleAction.should.be.calledOnceWithExactly(req, res, next, 'addItem');
      });

      it('sends the addItem action when url action is missing, but new fields to add are present, ' +
        'and elements already exist', () => {
        req.form.options.aggregateFrom = ['personAddNumber',
          'personAddFirstName',
          'personAddFamilyName',
          'personAddNickname',
          'personAddDob',
          'personAddAgeRange',
          'personAddNationality',
          'personAddGender',
          'personAddPassport',
          'personAddId',
          'personAddNi'];

        req.sessionModel.set('persons', [{ itemTitle: '', fields: {} }]);


        req.sessionModel.set('personAddFirstName', 'Ronald');
        req.sessionModel.set('personAddFamilyName', 'Testman');

        behaviour.getValues(req, res, next);

        behaviour.handleAction.should.be.calledOnceWithExactly(req, res, next, 'addItem');
      });

      it('sends the redirectToAddStep action when url action is not present, no new fields to add are present, ' +
        'and no elements have been added', () => {
        req.form.options.aggregateFrom = ['personAddNumber',
          'personAddFirstName',
          'personAddFamilyName',
          'personAddNickname',
          'personAddDob',
          'personAddAgeRange',
          'personAddNationality',
          'personAddGender',
          'personAddPassport',
          'personAddId',
          'personAddNi'];
        behaviour.getValues(req, res, next);

        behaviour.handleAction.should.be.calledOnceWithExactly(req, res, next, 'redirectToAddStep');
      });
    });

    describe('#handleAction', () => {
      beforeEach(() => {
        behaviour.deleteItem = sinon.stub();
        behaviour.editItem = sinon.stub();
        behaviour.addItem = sinon.stub();
        behaviour.redirectToAddStep = sinon.stub();
      });

      it('calls deleteItem when the action is delete', () => {
        behaviour.handleAction(req, res, next, 'delete').redirected.should.be.true;
        behaviour.deleteItem.should.be.calledOnceWithExactly(req, res);
      });

      it('calls editItem when the action is edit', () => {
        behaviour.handleAction(req, res, next, 'edit').redirected.should.be.true;
        behaviour.editItem.should.be.calledOnceWithExactly(req, res);
      });

      it('calls addItem when the action is addItem', () => {
        behaviour.handleAction(req, res, next, 'addItem').redirected.should.be.true;
        behaviour.addItem.should.be.calledOnceWithExactly(req, res);
      });

      it('calls redirectToAddStep when the action is redirectToAddStep', () => {
        behaviour.handleAction(req, res, next, 'redirectToAddStep').redirected.should.be.true;
        behaviour.redirectToAddStep.should.be.calledOnceWithExactly(req, res);
      });

      it('calls super.getValues when the action is showItems', () => {
        behaviour.handleAction(req, res, next, 'showItemsshowItems').redirected.should.be.false;
        superGetValuesStub.should.be.calledOnceWithExactly(req, res, next);
      });

      it('calls super.getValues as a default', () => {
        behaviour.handleAction(req, res, next, '');
        superGetValuesStub.should.be.calledOnceWithExactly(req, res, next);
      });
    });

    describe('delete item', () => {
      beforeEach(() => {
        req.sessionModel.set('persons', {
          aggregatedValues: [
            { itemTitle: 'Person 1', fields: [Array] },
            { itemTitle: 'Person 2', fields: [Array] }
          ]
        });
        req.params.id = '1';
      });

      it('deletes the item with the given id when the action is delete and an id is provide', () => {
        behaviour.deleteItem(req, res);
        req.sessionModel.get('persons').aggregatedValues.should.eql([
          { itemTitle: 'Person 1', fields: [Array] }
        ]);
      });

      it('redirects back to step after deletion', () => {
        behaviour.deleteItem(req, res);
        res.redirect.should.be.calledOnceWithExactly('/test/person-details');
      });
    });

    describe('edit item', () => {
      beforeEach(() => {
        req.form.options.aggregateFrom = [
          'personAddNumber',
          'personAddFirstName',
          'personAddFamilyName',
          'personAddNickname',
          'personAddDob',
          'personAddAgeRange',
          'personAddNationality',
          'personAddGender',
          'personAddPassport',
          'personAddId',
          'personAddNi'
        ];

        req.sessionModel.set('persons', {
          aggregatedValues: [
            {
              itemTitle: '',
              fields: [{ field: 'personAddNumber', value: 'Person 1' },
                { field: 'personAddFirstName', value: 'Ronald' },
                { field: 'personAddFamilyName', value: 'Testman' },
                { field: 'personAddNickname', value: '' },
                { field: 'personAddDob', value: '2000-10-15' },
                { field: 'personAddAgeRange', value: '' },
                { field: 'personAddNationality', value: '' },
                { field: 'personAddGender', value: '' },
                { field: 'personAddPassport', value: '' },
                { field: 'personAddId', value: '' },
                { field: 'personAddNi', value: '' }
              ]
            },
            {
              itemTitle: '',
              fields: [{ field: 'personAddNumber', value: 'Person 1' },
                { field: 'personAddFirstName', value: 'Ronda' },
                { field: 'personAddFamilyName', value: 'Testman' },
                { field: 'personAddNickname', value: '' },
                { field: 'personAddDob', value: '' },
                { field: 'personAddAgeRange', value: '' },
                { field: 'personAddNationality', value: '' },
                { field: 'personAddGender', value: 'female' },
                { field: 'personAddPassport', value: '' },
                { field: 'personAddId', value: '' },
                { field: 'personAddNi', value: '' }
              ]
            }
          ]
        });
        req.params.id = '1';

        behaviour.editItem(req, res);
      });

      it('populates the source form fields when the action is edit and an id is provided', () => {
        req.sessionModel.get('personAddFirstName').should.eql('Ronda');
        req.sessionModel.get('personAddFamilyName').should.eql('Testman');
      });

      it('redirects to the source form', () => {
        res.redirect.should.be.calledOnceWithExactly('/test/add-person/edit');
      });
    });

    describe('update item', () => {
      beforeEach(() => {
        req.form.options.aggregateFrom = [
          'personAddNumber',
          'personAddFirstName',
          'personAddFamilyName',
          'personAddNickname',
          'personAddDob',
          'personAddAgeRange',
          'personAddNationality',
          'personAddGender',
          'personAddPassport',
          'personAddId',
          'personAddNi'
        ];
        req.form.options.titleField = 'personAddNumber';
        req.sessionModel.set('persons', {
          aggregatedValues:
            [
              {
                itemTitle: 'Person 1',
                fields: [{ field: 'personAddNumber', value: 'Person 1' },
                  { field: 'personAddFirstName', value: 'Ronald' },
                  { field: 'personAddFamilyName', value: 'Testman' },
                  { field: 'personAddNickname', value: '' },
                  { field: 'personAddDob', value: '2000-10-15' },
                  { field: 'personAddAgeRange', value: '' },
                  { field: 'personAddNationality', value: '' },
                  { field: 'personAddGender', value: '' },
                  { field: 'personAddPassport', value: '' },
                  { field: 'personAddId', value: '' },
                  { field: 'personAddNi', value: '' }
                ]
              },
              {
                itemTitle: 'Person 2',
                fields: [{ field: 'personAddNumber', value: 'Person 2' },
                  { field: 'personAddFirstName', value: 'Ronda' },
                  { field: 'personAddFamilyName', value: 'Testman' },
                  { field: 'personAddNickname', value: '' },
                  { field: 'personAddDob', value: '' },
                  { field: 'personAddAgeRange', value: '' },
                  { field: 'personAddNationality', value: '' },
                  { field: 'personAddGender', value: 'female' },
                  { field: 'personAddPassport', value: '' },
                  { field: 'personAddId', value: '' },
                  { field: 'personAddNi', value: '' }
                ]
              }
            ]
        });
        req.sessionModel.set('persons-itemToReplaceId', 1);

        req.sessionModel.set('personAddNumber', 'Person 2');
        req.sessionModel.set('personAddFirstName', 'Buzz');
        req.sessionModel.set('personAddFamilyName', 'Lightyear');
        req.sessionModel.set('personAddNickname', 'Infinity');
        req.sessionModel.set('personAddDob', '1995-11-2');
        req.sessionModel.set('personAddAgeRange', '25-34');
        req.sessionModel.set('personAddNationality', 'United States of America');
        req.sessionModel.set('personAddGender', 'male');
        req.sessionModel.set('personAddPassport', '123');
        req.sessionModel.set('personAddId', '156');
        req.sessionModel.set('personAddNi', 'TS1995');

        behaviour.updateItem(req, res);
      });

      it('unsets field used to indicate an update operation', () => {
        expect(req.sessionModel.get('persons-itemToReplaceId')).to.be.undefined;
        expect(req.sessionModel.get('personAddNumber')).to.be.undefined;
        expect(req.sessionModel.get('personAddFirstName')).to.be.undefined;
        expect(req.sessionModel.get('personAddFamilyName')).to.be.undefined;
        expect(req.sessionModel.get('personAddNickname')).to.be.undefined;
        expect(req.sessionModel.get('personAddDob')).to.be.undefined;
        expect(req.sessionModel.get('personAddAgeRange')).to.be.undefined;
        expect(req.sessionModel.get('personAddNationality')).to.be.undefined;
        expect(req.sessionModel.get('personAddGender')).to.be.undefined;
        expect(req.sessionModel.get('personAddPassport')).to.be.undefined;
        expect(req.sessionModel.get('personAddId')).to.be.undefined;
        expect(req.sessionModel.get('personAddNi')).to.be.undefined;
      });

      it('replaces an item with the source step fields when itemToReplaceId is present ' +
        'in the session and action is edit', () => {
        const updatedElement = req.sessionModel.get('persons').aggregatedValues[1];

        updatedElement.should.be.eql({
          itemTitle: 'Person 2',
          fields: [
            { field: 'personAddNumber', value: 'Person 2', parsed: 'Person 2' },
            { field: 'personAddFirstName', value: 'Buzz', parsed: 'Buzz' },
            { field: 'personAddFamilyName', value: 'Lightyear', parsed: 'Lightyear' },
            { field: 'personAddNickname', value: 'Infinity', parsed: 'Infinity' },
            { field: 'personAddDob', value: '1995-11-2', parsed: '1995-11-2' },
            { field: 'personAddAgeRange', value: '25-34', parsed: '25-34' },
            { field: 'personAddNationality', value: 'United States of America', parsed: 'United States of America' },
            { field: 'personAddGender', value: 'male', parsed: 'male' },
            { field: 'personAddPassport', value: '123', parsed: '123' },
            { field: 'personAddId', value: '156', parsed: '156' },
            { field: 'personAddNi', value: 'TS1995', parsed: 'TS1995' }
          ]
        });
      });

      it('should return to the confirm step if user comes from summary', () => {
        req.form.options.aggregateFrom = [
          'personAddNumber',
          'personAddFirstName',
          'personAddFamilyName',
          'personAddNickname',
          'personAddDob',
          'personAddAgeRange',
          'personAddNationality',
          'personAddGender',
          'personAddPassport',
          'personAddId',
          'personAddNi'
        ];
        req.form.options.titleField = 'personAddNumber';

        req.sessionModel.set('persons', {
          aggregatedValues: [
            {
              itemTitle: 'Person 1',
              fields: [{ field: 'personAddNumber', value: 'Person 1' },
                { field: 'personAddFirstName', value: 'Ronald' },
                { field: 'personAddFamilyName', value: 'Testman' },
                { field: 'personAddNickname', value: '' },
                { field: 'personAddDob', value: '2000-10-15' },
                { field: 'personAddAgeRange', value: '' },
                { field: 'personAddNationality', value: '' },
                { field: 'personAddGender', value: '' },
                { field: 'personAddPassport', value: '' },
                { field: 'personAddId', value: '' },
                { field: 'personAddNi', value: '' }
              ]
            },
            {
              itemTitle: '',
              fields: [{ field: 'personAddNumber', value: '' },
                { field: 'personAddFirstName', value: 'Ronda' },
                { field: 'personAddFamilyName', value: 'Testman' },
                { field: 'personAddNickname', value: '' },
                { field: 'personAddDob', value: '' },
                { field: 'personAddAgeRange', value: '' },
                { field: 'personAddNationality', value: '' },
                { field: 'personAddGender', value: 'female' },
                { field: 'personAddPassport', value: '' },
                { field: 'personAddId', value: '' },
                { field: 'personAddNi', value: '' }
              ]
            }
          ]
        });
        req.params.action = 'edit';
        req.sessionModel.set('persons-itemToReplaceId', 1);
        req.sessionModel.set('personAddFirstName', 'Buzz');
        req.sessionModel.set('personAddFamilyName', 'Lightyear');
        req.sessionModel.set('returnToSummary', true);

        behaviour.getValues(req, res, next);

        res.redirect.should.be.calledWithExactly('/test/confirm');
      });
    });

    describe('add item', () => {
      beforeEach(() => {
        req.form.options.aggregateFrom = [
          'personAddNumber',
          'personAddFirstName',
          'personAddFamilyName',
          'personAddNickname',
          'personAddDob',
          'personAddAgeRange',
          'personAddNationality',
          'personAddGender',
          'personAddPassport',
          'personAddId',
          'personAddNi'
        ];
        req.form.options.titleField = 'personAddNumber';

        req.sessionModel.set('personAddNumber', 'Person 3');
        req.sessionModel.set('personAddFirstName', 'Ronald');
        req.sessionModel.set('personAddFamilyName', 'Testman');
        req.sessionModel.set('personAddNickname', 'Testy');
        req.sessionModel.set('personAddDob', '1996-10-22');
        req.sessionModel.set('personAddAgeRange', '25-34');
        req.sessionModel.set('personAddNationality', 'France');
        req.sessionModel.set('personAddGender', 'male');
        req.sessionModel.set('personAddPassport', '123');
        req.sessionModel.set('personAddId', '156');
        req.sessionModel.set('personAddNi', '');

        req.sessionModel.set('persons', {
          aggregatedValues: [
            {
              itemTitle: 'Person 1',
              fields: [{ field: 'personAddFirstName', value: 'Buzz' },
                { field: 'personAddFamilyName', value: 'Lightyear' }
              ]
            },
            {
              itemTitle: 'Person 2',
              fields: [{ field: 'personAddFirstName', value: 'Tony' },
                { field: 'personAddFamilyName', value: 'McTester' }
              ]
            }
          ]
        });

        behaviour.addItem(req, res, next);
      });

      it('adds a new item', () => {
        const addedElement = req.sessionModel.get('persons').aggregatedValues[2];

        addedElement.should.be.eql({
          itemTitle: 'Person 3',
          fields: [
            { field: 'personAddNumber', value: 'Person 3', changeField: undefined,
              parsed: 'Person 3', showInSummary: false },
            { field: 'personAddFirstName', value: 'Ronald', changeField: undefined,
              parsed: 'Ronald', showInSummary: true },
            { field: 'personAddFamilyName', value: 'Testman', changeField: undefined,
              parsed: 'Testman', showInSummary: true },
            { field: 'personAddNickname', value: 'Testy', changeField: undefined,
              parsed: 'Testy', showInSummary: true },
            { field: 'personAddDob', value: '1996-10-22', changeField: undefined,
              parsed: '1996-10-22', showInSummary: true },
            { field: 'personAddAgeRange', value: '25-34', changeField: undefined,
              parsed: '25-34', showInSummary: true },
            { field: 'personAddNationality', value: 'France', changeField: undefined,
              parsed: 'France', showInSummary: true },
            { field: 'personAddGender', value: 'male', changeField: undefined, parsed: 'male',
              showInSummary: true },
            { field: 'personAddPassport', value: '123', changeField: undefined, parsed: '123',
              showInSummary: true },
            { field: 'personAddId', value: '156', changeField: undefined, parsed: '156',
              showInSummary: true },
            { field: 'personAddNi', value: '', changeField: undefined, parsed: '',
              showInSummary: true }
          ]
        });
      });
    });

    describe('#locals', () => {
      let result;
      beforeEach(() => {
        req.form.options.aggregateFrom = [
          'personAddNumber',
          'personAddFirstName',
          'personAddFamilyName',
          'personAddNickname',
          'personAddDob',
          'personAddAgeRange',
          'personAddNationality',
          'personAddGender',
          'personAddPassport',
          'personAddId',
          'personAddNi'
        ];

        req.sessionModel.set('persons', {
          aggregatedValues: [
            {
              itemTitle: '',
              fields: [
                {
                  field: 'personAddFirstName',
                  value: 'John',
                  showInSummary: false
                }
              ]
            }
          ]
        });

        result = behaviour.locals(req, res);
      });

      it('should call super', () => {
        superLocalsStub.should.be.calledWithExactly(req, res);
      });

      it('should populate the correct items', () => {
        result.should.containSubset({
          items: [
            {
              itemTitle: '',
              fields: [
                {
                  field: 'personAddFirstName',
                  value: 'John',
                  showInSummary: false
                }
              ],
              index: 0
            }
          ],
          hasItems: true,
          addStep: 'add-person',
          addAnotherLinkText: 'person',
          field: 'persons'
        });
      });
    });

    // describe('#parseField', () => {
    //   it('it should run the field parser', () => {
    //     req.form.options.aggregateTo = 'persons';
    //     req.sessionModel = new Model({});

    //     req.form.options.fieldsConfig =
    //       { personAddDob: { parse: d => d && moment(d).format(config.PRETTY_DATE_FORMAT) } };


    //      const value = 1970 - parseInt('01', 8) - parseInt('01', 8);


    //     const field = {
    //       field: 'personAddDob',
    //       changeField: 'personAddDob-day'
    //     };

    //     const result = behaviour.parseField(field, value, req);

    //     result.should.eql('1st January 1970');
    //   });
    // });
  });
});
