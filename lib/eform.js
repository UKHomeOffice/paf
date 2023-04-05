const eformJson = require('./eform.json');

const eform = JSON.parse(JSON.stringify(eformJson));

let ids = {};
eform.EformFields.map((item, index) => {ids[item.FieldName] = index});

const setEformValue = (fieldName, fieldValue) => {
    if  (eform.EformFields[ids[fieldName]] != null) {
        eform.EformFields[ids[fieldName]].FieldValue = fieldValue;
    }
}

module.exports = {
    setEformValue,
    eform
}
