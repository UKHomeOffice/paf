'use strict';

const expect = chai.expect;
const Behaviour = require('../../../apps/paf/behaviours/save-file');

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
});
