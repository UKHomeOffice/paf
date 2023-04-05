'use strict';
const { Producer } = require('sqs-producer');
const config = require('../config');
const {getImsFieldName} = require('./ims-hof-fields-map.js');
const {setEformValue, eform} = require('./eform.js')

const mapFields = (data) => {
    for(let i = 0; i < Object.keys(data).length; i++) {
        let imsFieldName = getImsFieldName(Object.keys(data)[i]);
        if ( imsFieldName != '') {
          setEformValue(imsFieldName, Object.values(data)[i]);
      }
  }
  return JSON.stringify(eform);
}

const sendToQueue = (data, id) => {
  try {
    const producer = Producer.create(config.awsSqs);

    return new Promise((resolve, reject) => {
      producer.send(
        [
          {
            id,
            body: JSON.stringify(data)
          }
        ])
        .then(response => {
          const log = {
            sqsResponse: response,
            allegationDetails: {
              sqsMessageId: response[0].MessageId,
              allegationId: id,
              data
            }
          };

          // eslint-disable-next-line no-console
          console.log('Successfully sent to SQS queue: ', log);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  } catch (err) {
    throw new Error('Failed to send to sqs queue', err);
  }
};

module.exports = {
  mapFields,
  sendToQueue
};
