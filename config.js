'use strict';
/* eslint no-process-env: 0 */

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
  }
};
