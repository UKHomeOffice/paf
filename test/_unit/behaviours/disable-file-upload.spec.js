'use strict';

const Behaviour = require('../../../apps/paf/behaviours/disable-file-upload');

describe('apps/paf/behaviours/disable-file-upload', () => {
  let locals;
  let controller;
  let req;
  let res;

  beforeEach(() => {
    locals = { title: 'Other information' };
    class BaseController {
      locals() {
        return locals;
      }
    }

    const DisableFileUploadController = Behaviour(BaseController);
    controller = new DisableFileUploadController();
    req = {
      sessionModel: { get: sinon.stub() },
      form: { options: { fields: { 'other-info-file-upload': {} } } }
    };
    res = {};
  });

  it('clears field attributes when there are no uploaded images', () => {
    req.sessionModel.get.withArgs('images').returns(undefined);

    controller.locals(req, res).should.equal(locals);
    req.form.options.fields['other-info-file-upload'].attributes.should.deep.equal([]);
  });

  it('clears field attributes when fewer than three images are uploaded', () => {
    req.sessionModel.get.withArgs('images').returns(['one', 'two']);

    controller.locals(req, res).should.equal(locals);
    req.form.options.fields['other-info-file-upload'].attributes.should.deep.equal([]);
  });

  it('disables the field when three or more images are uploaded', () => {
    req.sessionModel.get.withArgs('images').returns(['one', 'two', 'three']);

    controller.locals(req, res).should.equal(locals);
    req.form.options.fields['other-info-file-upload'].attributes.should.deep.equal([
      { attribute: 'disabled' }
    ]);
  });
});
