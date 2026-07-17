/* eslint no-process-env: 0 */

const fs = require('fs');
const path = require('path');

const envFiles = ['.env.test', '.env'];
const envFile = envFiles
  .map(file => path.resolve(__dirname, '..', file))
  .find(filePath => fs.existsSync(filePath));

if (envFile) {
  process.loadEnvFile(envFile);
}

function getPlugin(moduleName) {
  const plugin = require(moduleName);
  return plugin.default || plugin;
}

global.reqres = require('hof').utils.reqres;

global.chai = require('chai')
  .use(getPlugin('sinon-chai'))
  .use(getPlugin('chai-as-promised'))
  .use(getPlugin('chai-subset'));
global.should = chai.should();
global.expect = chai.expect;
global.assert = require('assert');
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');
global.path = path;
global.config = require('../config');
global._ = require('lodash');
global.request = reqres.req;
global.response = reqres.res;

const utils = require('./helpers/supertest_session/supertest-utilities.js');
global.getSupertestApp = (subApp, subAppPath, pages) => utils.getSupertestApp(subApp, subAppPath, pages);

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
