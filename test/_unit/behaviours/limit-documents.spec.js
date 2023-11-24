'use strict';

const Behaviour = require('../../../apps/paf/behaviours/limit-documents');
const Controller = require('hof').controller;


describe("apps/paf 'limit-documents' behaviour should ", () => {
  let behaviour;
  let req;
  let res;

  beforeEach(done => {
    req = reqres.req();
    res = reqres.res();

    const LimitDocs = Behaviour(Controller);
    behaviour = new LimitDocs({ template: 'index', route: '/index' });
    behaviour._configure(req, res, done);
  });

  describe("The limit-documents '.validate' method", () => {
    it('returns an too many error if 3 files have already been added', () => {
      req.form.values.images = [{
        name: 'bass.png',
        encoding: '7bit',
        mimetype: 'png',
        truncated: false,
        size: 144148
      },
      {
        name: 'treble.png',
        encoding: '7bit',
        mimetype: 'png',
        truncated: false,
        size: 144149
      },
      {
        name: 'quaver.png',
        encoding: '7bit',
        mimetype: 'png',
        truncated: false,
        size: 144150
      }
      ];

      req.sessionModel.set('images', req.form.values.images);
      const images = req.sessionModel.get('images');
      req.form.values['other-info-file-uploads-add-another'] = 'yes';
      behaviour.validate(req, res, err => {
        err['other-info-file-uploads-add-another'].should.be.an.instanceof(behaviour.ValidationError);
        err['other-info-file-uploads-add-another'].should.have.property('type').and.equal('tooMany');
      });
    });
  });
});
