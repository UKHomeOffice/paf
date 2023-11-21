'use strict';
/* eslint no-process-env: 0 */
const AWS = require('aws-sdk');

const env = process.env.NODE_ENV;
const useMocks = process.env.USE_MOCKS === 'true' || !env;

module.exports = {
  env: env,
  PRETTY_DATE_FORMAT: 'Do MMMM YYYY',
  csp: {
    imgSrc: ['data:']
  },
  useMocks: useMocks,
  upload: {
    maxFileSize: '100mb',
    // if mocks set use file service served up by app otherwise use filevault's port 3000
    hostname: !useMocks && process.env.FILE_VAULT_URL ?
      process.env.FILE_VAULT_URL :
      `http://localhost:${useMocks ? (process.env.PORT || 8080) : 3000}/file`
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  },
  awsSqs: {
    endpoint: new AWS.Endpoint('http://localhost:4566'),
    region: process.env.AWS_REGION,
    queueUrl: process.env.SQS_URL,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  }
};
