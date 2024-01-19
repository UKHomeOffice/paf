'use strict';

const _ = require('lodash');
const config = require('../../../config');
const Model = require('../models/file-upload');
const fileSizeNum = size => size.match(/\d+/g)[0];

module.exports = name => superclass => class extends superclass {
  process(req) {
    if (req.files && req.files[name]) {
      // set image name on values for filename extension validation
      // N:B validation controller gets values from
      // req.form.values and not on req.files
      req.form.values[name] = req.files[name].name;
      req.log('info', `Reference: ${req.sessionModel.get('reference')}, 
                       Processing image: ${req.form.values[name]}`);
    }
    super.process.apply(this, arguments);
  }

  locals(req, res, next) {
    if (!Object.keys(req.form.errors).length) {
      req.form.values['other-info-file-upload'] = null;
    }
    const maxNum = fileSizeNum(config.upload.maxFileSize);
    const maxSize = config.upload.maxFileSize.match(/[a-zA-Z]+/g)[0].toUpperCase();
    return Object.assign({}, super.locals(req, res, next), {
      maxFileSize: `${maxNum} ${maxSize}`
    });
  }

  validateField(key, req) {
    if (req.form.values['other-info-file-upload']) {
      const fileUpload = _.get(req.files, `${name}`);
      if (fileUpload) {
        const uploadSize = fileUpload.size;
        const mimetype = fileUpload.mimetype;
        const uploadSizeTooBig = uploadSize > (fileSizeNum(config.upload.maxFileSize) * 1000000);
        const uploadSizeBeyondServerLimits = uploadSize === null;
        const invalidMimetype = !config.upload.allowedMimeTypes.includes(mimetype);
        const invalidSize = uploadSizeTooBig || uploadSizeBeyondServerLimits;

        if (invalidSize || invalidMimetype) {
          return new this.ValidationError(key, {
            key,
            type: invalidSize ? 'maxFileSize' : 'fileType',
            redirect: undefined
          });
        }
      } else {
        return new this.ValidationError(key, {
          key,
          type: 'required',
          redirect: undefined
        });
      }
    }

    return super.validateField(key, req);
  }

  saveValues(req, res, next) {
    const images = req.sessionModel.get('images') || [];
    if (req.files && req.files[name]) {
      req.log('info', `Reference: ${req.sessionModel.get('reference')}, Saving image: ${req.files[name].name}`);
      const image = _.pick(req.files[name], ['name', 'data', 'mimetype']);
      const model = new Model(image);
      return model.save()
        .then(() => {
          req.sessionModel.set('images', [...images, model.toJSON()]);
          return super.saveValues(req, res, next);
        })
        .catch(next);
    }
    return super.saveValues.apply(this, arguments);
  }
};
