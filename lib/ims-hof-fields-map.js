const fieldsMapJson = require('./ims-hof-fields-map.json');

const fieldsMap = JSON.parse(JSON.stringify(fieldsMapJson));

let ids = {};
fieldsMap.Fields.map((item, index) => {ids[item.HOF] = index});

const getImsFieldName = (hofFieldName) => {
    return (fieldsMap.Fields[ids[hofFieldName]] != null) ? fieldsMap.Fields[ids[hofFieldName]].IMS : '';
}

module.exports = {
    getImsFieldName
}
