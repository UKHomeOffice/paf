'use strict';

const expect = chai.expect;
const Behaviour = require('../../../apps/paf/behaviours/save-file');
const Model = require('../../../apps/paf/models/file-upload');

describe("apps/paf 'save-file' behaviour should ", () => {
  class Base {
    process() {}
    locals() { return {}; }
    saveValues(req, res, callback) { callback(); }
  }

  let req;
  let res;
  let next;
  let sandbox;
  let instance;

  const uploadedFile = {
    name: 'guitar.png',
    encoding: '7bit',
    mimetype: 'image/png',
    truncated: false,
    size: 144148,
    data: Buffer.from('file contents')
  };

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    req.files = { upload: uploadedFile };
    req.form.errors = {};
    req.form.values = {};
    next = sinon.spy();
    sandbox = sinon.createSandbox();
    instance = new (Behaviour('upload')(Base))();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  it('passes the processed request to the parent behavior', () => {
    const process = sandbox.stub(Base.prototype, 'process');
    const callback = sinon.spy();

    instance.process(req, res, callback);

    expect(req.form.values.upload).to.equal('guitar.png');
    expect(process).to.have.been.calledWith(req, res, callback);
  });

  it('clears the upload input value when there are no validation errors', () => {
    instance.locals(req, res);

    expect(req.form.values.upload).to.equal(null);
  });

  it('preserves the upload input value when the form has validation errors', () => {
    req.form.errors = { upload: new Error('invalid') };
    req.form.values.upload = 'guitar.png';

    instance.locals(req, res);

    expect(req.form.values.upload).to.equal('guitar.png');
  });

  it('passes through to the parent when no file was uploaded', () => {
    const saveValues = sandbox.stub(Base.prototype, 'saveValues').callsFake((request, response, callback) => {
      callback();
    });
    delete req.files.upload;

    instance.saveValues(req, res, next);

    expect(saveValues).to.have.been.calledOnce;
    expect(next).to.have.been.calledOnceWithExactly();
  });

  it('saves the uploaded file and continues the HOF callback flow', async () => {
    const saveValues = sandbox.stub(Base.prototype, 'saveValues').callsFake((request, response, callback) => {
      callback();
    });
    const save = sandbox.stub(Model.prototype, 'save').callsFake(function () {
      this.set('url', '/file/generate-link/id');
      this.unset('data');
      return Promise.resolve(this);
    });

    await instance.saveValues(req, res, next);

    expect(save).to.have.been.calledOnce;
    expect(req.sessionModel.get('images')).to.have.lengthOf(1);
    expect(req.sessionModel.get('images')[0]).to.include({ name: 'guitar.png', url: '/file/generate-link/id' });
    expect(saveValues).to.have.been.calledOnce;
    expect(next).to.have.been.calledOnceWithExactly();
  });

  it('passes upload failures to the HOF error callback without saving form values', async () => {
    const error = new Error('upload failed');
    const saveValues = sandbox.stub(Base.prototype, 'saveValues');
    sandbox.stub(Model.prototype, 'save').rejects(error);

    await instance.saveValues(req, res, next);

    expect(saveValues).not.to.have.been.called;
    expect(next).to.have.been.calledOnceWithExactly(error);
  });
});
