const _ = require('lodash');

module.exports = superclass => class extends superclass {
// Additional person fields are optional, so this behaviour
// sets each additional person a number so as to be identifiable.

  locals(req, res) {
    const locals = super.locals(req, res);

    // render person number on person-details page
    _.forEach(locals.items, i => {
      const personNumber = _.indexOf(locals.items, i) + 1;
      i.itemTitle = 'Person ' + personNumber;
      _.forEach(i.fields, field => {
        if (field.field === 'personAddNumber') {
          field.value = personNumber;
          field.parsed = personNumber;
        }
      });
    });

    // render only person number field for Additional People section on check answers page
    if (locals.route === 'confirm') {
      _.forEach(locals.rows, fields => {
        locals.rows = locals.rows.map(row => {
          if (row.section === 'Additional People') {
            row.fields = row.fields.filter(r => r.field === 'personAddNumber');
            _.forEach(fields, sectionFields => {
              _.forEach(sectionFields, field => {
                if (field.field === 'personAddNumber') {
                  field.value = 'Person ' + (field.index + 1);
                  field.parsed = 'Person ' + (field.index + 1);
                }
              });
            });
            return row;
          }
          return row;
        });
      });
    }
    return locals;
  }
};
