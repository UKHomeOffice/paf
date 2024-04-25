'use strict';
/* eslint-disable no-console*/
const { Producer } = require('sqs-producer');
const config = require('../config');

const sendToQueue = (data, id) => {
  try {
    const producer = Producer.create(config.awsSqs);

    return new Promise((resolve, reject) => {
      producer.send(
        [
          {
            id,
            body: data
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
  sendToQueue
};
