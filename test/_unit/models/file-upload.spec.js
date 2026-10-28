
'use strict';

const Model = require('../../../apps/paf/models/file-upload');
const config = require('../../../config');
const FormData = require('form-data');

describe('File Upload Model', () => {
  let sandbox;

  beforeEach(function () {
    config.upload.hostname = 'http://file-upload.example.com/file/upload';
    sandbox = sinon.createSandbox();
    sandbox.stub(Model.prototype, 'request').returns({
      api: 'response',
      url: '/file/12341212132123?foo=bar'
    });
    sandbox.stub(Model.prototype, 'auth').returns(new Promise(resolve => {
      resolve({ bearer: 'myaccesstoken' });
    }));
  });

  afterEach(() => sandbox.restore());

  describe('save', () => {
    it('returns a promise', () => {
      const model = new Model();
      const response = model.save();
      expect(response).to.be.an.instanceOf(Promise);
    });

    it('makes a call to file upload api', async () => {
      const model = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      await model.save();
      expect(model.request).to.have.been.calledOnce;
      expect(model.request).to.have.been.calledWith(sinon.match({
        method: 'POST',
        host: 'file-upload.example.com',
        path: '/file/upload',
        protocol: 'http:'
      }));
    });

    it('resolves with response from api endpoint', async () => {
      const model = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      const response = await model.save();
      expect(response.attributes.url).to.equal('/file/generate-link/12341212132123');
    });

    it('rejects if api call fails', async () => {
      const model = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      const err = new Error('test error');
      model.request.rejects(err);
      try {
        await model.save();
      } catch (e) {
        expect(e).to.equal(err);
      }
    });

    it('adds a formData property to api request with details of uploaded file', async () => {
      const uploadedFile = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      await uploadedFile.save();
      expect(uploadedFile.request).to.have.been.calledWith(sinon.match({
        data: sinon.match.instanceOf(FormData)
      }));
    });
  });

  describe('auth', () => {
    beforeEach(() => {
      Model.prototype.auth.restore();
    });

    it('returns a fallback bearer token when no Keycloak token URL is configured', async () => {
      sandbox.stub(config.keycloak, 'token').value(undefined);
      const model = new Model();
      const requestStub = sandbox.stub(model, '_request');

      const result = await model.auth();

      expect(result).to.deep.equal({ bearer: 'abc123' });
      expect(requestStub).not.to.have.been.called;
    });

    it('returns the access token from a successful Keycloak response', async () => {
      sandbox.stub(config.keycloak, 'token').value('https://keycloak.example.com/token');
      sandbox.stub(config.keycloak, 'username').value('test-user');
      sandbox.stub(config.keycloak, 'password').value('test-password');
      sandbox.stub(config.keycloak, 'clientId').value('test-client');
      sandbox.stub(config.keycloak, 'secret').value('test-secret');
      const model = new Model();
      const requestStub = sandbox.stub(model, '_request').resolves({
        data: { access_token: 'test-access-token' }
      });

      const result = await model.auth();

      expect(result).to.deep.equal({ bearer: 'test-access-token' });
      expect(requestStub).to.have.been.calledOnceWithExactly({
        url: 'https://keycloak.example.com/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          username: 'test-user',
          password: 'test-password',
          grant_type: 'password',
          client_id: 'test-client',
          client_secret: 'test-secret'
        },
        method: 'POST'
      });
    });

    it('rethrows errors from the Keycloak request', async () => {
      sandbox.stub(config.keycloak, 'token').value('https://keycloak.example.com/token');
      const model = new Model();
      const error = new Error('Keycloak request failed');
      error.response = { data: { error: 'invalid_client', error_description: 'Client authentication failed' } };
      sandbox.stub(model, '_request').rejects(error);

      await expect(model.auth()).to.be.rejectedWith(error);
    });
  });
});
