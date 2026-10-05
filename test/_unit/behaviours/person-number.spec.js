'use strict';

const Behaviour = require('../../../apps/paf/behaviours/person-number');

describe('apps/paf/behaviours/person-number', () => {
  let locals;
  let controller;

  beforeEach(() => {
    locals = {};

    class BaseController {
      locals() {
        return locals;
      }
    }

    const PersonNumberController = Behaviour(BaseController);
    controller = new PersonNumberController();
  });

  it('numbers each person detail item and updates its person number field', () => {
    locals.items = [
      {
        itemTitle: '',
        fields: [
          { field: 'personAddNumber', value: '', parsed: '' },
          { field: 'firstName', value: 'Alice', parsed: 'Alice' }
        ]
      },
      {
        itemTitle: '',
        fields: [
          { field: 'personAddNumber', value: '', parsed: '' }
        ]
      }
    ];

    const result = controller.locals({}, {});

    result.should.equal(locals);
    locals.items[0].itemTitle.should.equal('Person 1');
    locals.items[0].fields[0].should.deep.equal({ field: 'personAddNumber', value: 1, parsed: 1 });
    locals.items[0].fields[1].should.deep.equal({ field: 'firstName', value: 'Alice', parsed: 'Alice' });
    locals.items[1].itemTitle.should.equal('Person 2');
    locals.items[1].fields[0].should.deep.equal({ field: 'personAddNumber', value: 2, parsed: 2 });
  });

  it('keeps only person number fields and labels them on the confirm route', () => {
    const firstNumber = { field: 'personAddNumber', index: 0, value: 1, parsed: 1 };
    const secondNumber = { field: 'personAddNumber', index: 1, value: 2, parsed: 2 };
    const additionalPeopleRow = {
      section: 'Additional People',
      fields: [
        firstNumber,
        { field: 'firstName', index: 0, value: 'Alice', parsed: 'Alice' },
        secondNumber,
        { field: 'firstName', index: 1, value: 'Bob', parsed: 'Bob' }
      ]
    };
    const otherRow = {
      section: 'About you',
      fields: [{ field: 'about-you-first-name', value: 'Charlie' }]
    };
    locals.route = 'confirm';
    locals.items = [];
    locals.rows = [additionalPeopleRow, otherRow];

    const result = controller.locals({}, {});

    result.should.equal(locals);
    additionalPeopleRow.fields.should.deep.equal([firstNumber, secondNumber]);
    firstNumber.value.should.equal('Person 1');
    firstNumber.parsed.should.equal('Person 1');
    secondNumber.value.should.equal('Person 2');
    secondNumber.parsed.should.equal('Person 2');
    otherRow.fields.should.deep.equal([{ field: 'about-you-first-name', value: 'Charlie' }]);
  });
});
