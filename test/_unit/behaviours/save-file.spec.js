'use strict';

const expect = chai.expect;
const Behaviour = require('../../../apps/paf/behaviours/save-file');
const Model = require('../../../apps/paf/models/file-upload');
const config = require('../../../config');

describe("apps/paf 'save-file' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    process() {}
    locals() {}
    saveValues() {}
  }

  let req;
  let res;
  let next;

  let instance;

  const imageFiles = {
    image: {
      name: 'guitar.png',
      encoding: '7bit',
      mimetype: 'png',
      truncated: false,
      size: 144148
    }
  };

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    req.files = imageFiles;
  });

  describe("The save-file ' process ' method", () => {
    before(() => {
      sinon.stub(Base.prototype, 'process');
      instance = new (Behaviour('image')(Base))();
    });

    it('should be called ', () => {
      instance.process(req);
      expect(Base.prototype.process).to.have.been.called;
    });

    it('should have a file attached to it', () => {
      req.files = imageFiles;
      instance.process(req);
      expect(req.files).to.eql(imageFiles);
    });

    it('should add files to form.values', () => {
      req.files.images = imageFiles;
      instance.process(req);
      expect(req.form.values.image).to.eql('guitar.png');
    });

    after(() => {
      Base.prototype.process.restore();
    });
  });

  describe("The save-file ' locals ' method", () => {
    before(() => {
      sinon.stub(Base.prototype, 'locals').returns(req, res, next);
      instance = new (Behaviour('name')(Base))();
    });

    it('should be called ', () => {
      req.form.errors = {};
      instance.locals(req, res, next);
      expect(Base.prototype.locals).to.have.been.called;
    });

    it("should not return null to 'other-info-file-upload' on request form values if errors", () => {
      req.form.errors = { error: 'err' };
      instance.locals(req, res, next);
      expect(req.form.values['other-info-file-upload']).to.not.eql(null);
      expect(req.form.values['other-info-file-upload']).to.eql();
    });

    it("should return null to 'other-info-file-upload' on request form values if there are no errors", () => {
      req.form.errors = {};
      instance.locals(req, res, next);
      expect(req.form.values['other-info-file-upload']).to.eql(null);
    });

    after(() => {
      Base.prototype.locals.restore();
    });
  });

  describe("The save-file ' saveValues ' method", () => {
    before(() => {
      sinon.stub(Base.prototype, 'saveValues').returns(req, res, next);
      instance = new (Behaviour('name')(Base))();
    });

    it('should be called ', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).to.have.been.calledOnce;
    });

    it('should attach files to the sessionModel ', () => {
      req.sessionModel.set('images', imageFiles);
      instance.saveValues(req, res, next);
      const sessionModel = req.sessionModel.get('images');
      expect(sessionModel.image.name).to.eql('guitar.png');
    });

    after(() => {
      Base.prototype.saveValues.restore();
    });
  });

  describe('complete behavior coverage', () => {
    let sandbox;
    let controller;
    let baseMethods;
    const uploadName = 'image';

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      config.upload.maxFileSize = '100mb';
      config.upload.allowedMimeTypes = ['image/png'];
      baseMethods = {
        process: sandbox.stub(),
        locals: sandbox.stub().returns({ baseLocal: true }),
        validateField: sandbox.stub().returns('base validation'),
        saveValues: sandbox.stub().returns('base save')
      };

      class BaseController {
        constructor() {
          this.ValidationError = class ValidationError extends Error {
            constructor(key, options) {
              super(key);
              this.key = key;
              Object.assign(this, options);
            }
          };
        }
        process(...args) { return baseMethods.process(...args); }
        locals(...args) { return baseMethods.locals(...args); }
        validateField(...args) { return baseMethods.validateField(...args); }
        saveValues(...args) { return baseMethods.saveValues(...args); }
      }

      const SaveFileController = Behaviour(uploadName)(BaseController);
      controller = new SaveFileController();
      req = reqres.req();
      res = reqres.res();
      next = sinon.spy();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('copies an uploaded filename into form values before delegating process', () => {
      req.files = { image: { name: 'guitar.png' } };
      req.form.values = {};
      req.log = sandbox.spy();
      req.sessionModel.set('reference', 'reference-123');

      controller.process(req);

      expect(req.form.values.image).to.equal('guitar.png');
      expect(req.log).to.have.been.calledOnce;
      expect(baseMethods.process).to.have.been.calledOnceWithExactly(req);
    });

    it('delegates process without modifying form values when there is no upload', () => {
      req.files = {};
      req.form.values = {};

      controller.process(req);

      expect(req.form.values).to.deep.equal({});
      expect(baseMethods.process).to.have.been.calledOnceWithExactly(req);
    });

    it('returns base locals with the configured maximum file size', () => {
      req.form.errors = {};
      req.form.values['other-info-file-upload'] = 'uploaded.png';

      const result = controller.locals(req, res, next);

      expect(req.form.values['other-info-file-upload']).to.equal(null);
      expect(result).to.deep.equal({ baseLocal: true, maxFileSize: '100 MB' });
      expect(baseMethods.locals).to.have.been.calledOnceWithExactly(req, res, next);
    });

    it('preserves the upload value when the form has errors', () => {
      req.form.errors = { image: 'invalid' };
      req.form.values['other-info-file-upload'] = 'uploaded.png';

      controller.locals(req, res, next);

      expect(req.form.values['other-info-file-upload']).to.equal('uploaded.png');
    });

    it('delegates validation when upload is not selected', () => {
      req.form.values['other-info-file-upload'] = '';

      expect(controller.validateField('image', req)).to.equal('base validation');
      expect(baseMethods.validateField).to.have.been.calledOnceWithExactly('image', req);
    });

    it('returns a required validation error when the selected upload is missing', () => {
      req.form.values['other-info-file-upload'] = 'uploaded.png';
      req.files = {};

      const error = controller.validateField('image', req);

      expect(error).to.be.instanceOf(controller.ValidationError);
      expect(error).to.include({ key: 'image', type: 'required', redirect: undefined });
      expect(baseMethods.validateField).not.to.have.been.called;
    });

    it('returns a maximum-size validation error for oversized and server-rejected uploads', () => {
      req.form.values['other-info-file-upload'] = 'uploaded.png';
      req.files = { image: { size: 100000001, mimetype: 'image/png' } };
      const oversizedError = controller.validateField('image', req);
      expect(oversizedError.type).to.equal('maxFileSize');

      req.files.image.size = null;
      const serverLimitError = controller.validateField('image', req);
      expect(serverLimitError.type).to.equal('maxFileSize');
    });

    it('returns a file-type validation error for unsupported MIME types', () => {
      req.form.values['other-info-file-upload'] = 'uploaded.png';
      req.files = { image: { size: 100, mimetype: 'application/zip' } };

      const error = controller.validateField('image', req);

      expect(error).to.be.instanceOf(controller.ValidationError);
      expect(error).to.include({ key: 'image', type: 'fileType', redirect: undefined });
    });

    it('delegates validation for a valid upload', () => {
      req.form.values['other-info-file-upload'] = 'uploaded.png';
      req.files = { image: { size: 100, mimetype: 'image/png' } };

      expect(controller.validateField('image', req)).to.equal('base validation');
      expect(baseMethods.validateField).to.have.been.calledOnceWithExactly('image', req);
    });

    it('saves an uploaded file, appends it to session images, and delegates saveValues', async () => {
      const saveStub = sandbox.stub(Model.prototype, 'save').resolves();
      const uploadedFile = { name: 'guitar.png', data: 'file-data', mimetype: 'image/png' };
      req.files = { image: { ...uploadedFile, size: 100 } };
      req.sessionModel.set('images', [{ name: 'existing.png' }]);
      req.sessionModel.set('reference', 'reference-123');
      req.log = sandbox.spy();

      const result = await controller.saveValues(req, res, next);
      const images = req.sessionModel.get('images');

      expect(saveStub).to.have.been.calledOnce;
      expect(images).to.have.length(2);
      expect(images[0]).to.deep.equal({ name: 'existing.png' });
      expect(images[1]).to.include(uploadedFile);
      expect(baseMethods.saveValues).to.have.been.calledOnceWithExactly(req, res, next);
      expect(result).to.equal('base save');
    });

    it('passes upload save failures to next', async () => {
      const saveStub = sandbox.stub(Model.prototype, 'save');
      const error = new Error('upload failed');
      saveStub.rejects(error);
      req.files = { image: { name: 'guitar.png', data: 'file-data', mimetype: 'image/png' } };
      req.log = sandbox.spy();

      await controller.saveValues(req, res, next);

      expect(next).to.have.been.calledOnceWithExactly(error);
      expect(baseMethods.saveValues).not.to.have.been.called;
    });

    it('delegates saveValues unchanged when no upload is present', () => {
      req.files = {};

      const result = controller.saveValues(req, res, next);

      expect(baseMethods.saveValues).to.have.been.calledOnceWithExactly(req, res, next);
      expect(result).to.equal('base save');
    });
  });
});
