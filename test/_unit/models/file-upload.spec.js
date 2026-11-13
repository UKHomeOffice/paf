
'use strict';

const Model = require('../../../apps/paf/models/file-upload');
const config = require('../../../config');
const fileUploadConfig = require('../../../apps/paf/models/file-upload-config');
const FormData = require('form-data');

describe('File Upload Model', () => {
  let sandbox;
  let originalUploadHostname;

  beforeEach(function () {
    originalUploadHostname = config.upload.hostname;
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

  afterEach(() => {
    sandbox.restore();
    config.upload.hostname = originalUploadHostname;
  });

  describe('save', () => {
    it('returns a promise', () => {
      const model = new Model();
      const response = model.save();
      expect(response).to.be.an.instanceOf(Promise);
    });

    it('fails immediately when the file upload service URL is missing', async () => {
      config.upload.hostname = undefined;
      const model = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });

      await expect(model.save()).to.be.rejectedWith('File upload service URL is not configured');
      expect(model.request).not.to.have.been.called;
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
        url: 'http://file-upload.example.com/file/upload',
        method: 'POST',
        timeout: fileUploadConfig.requestTimeoutMs
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

    it('rejects if the request helper returns an error instead of rejecting', async () => {
      const model = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      const err = new Error('upload unavailable');
      model.request.resolves(err);

      await expect(model.save()).to.be.rejectedWith(err);
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
});
