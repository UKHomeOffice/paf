'use strict';
/* eslint no-process-env: 0 */
const AWS = require('aws-sdk');

const env = process.env.NODE_ENV;

module.exports = {
  env: env,
  PRETTY_DATE_FORMAT: 'Do MMMM YYYY',

  awsSqs: {
    endpoint: new AWS.Endpoint('http://localhost:4566'), // remove later
    region: process.env.AWS_REGION,
    queueUrl: process.env.SQS_URL,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
};
