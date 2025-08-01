'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';
const useMocks = process.env.USE_MOCKS === 'true' || !env;

module.exports = {
  env: env,
  PRETTY_DATE_FORMAT: 'Do MMMM YYYY',
  csp: {
    imgSrc: ['data:']
  },
  useMocks: useMocks,
  upload: {
    maxFileSizeInBytes: 100 * 1024 * 1024, // 100MiB in bytes
    maxFileSize: '100mb',
    allowedMimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'text/plain',
      'application/vnd.oasis.opendocument.text',
      'application/vnd.oasis.opendocument.spreadsheet'
    ],
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
    region: process.env.AWS_REGION || 'eu-west-2',
    queueUrl: process.env.SQS_URL,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
  }
};
