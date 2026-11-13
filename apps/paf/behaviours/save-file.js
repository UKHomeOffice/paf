'use strict';

const _ = require('lodash');
const fileUploadConfig = require('../models/file-upload-config');
const Model = require('../models/file-upload');
const fileSizeNum = size => size.match(/\d+/g)[0];

module.exports = function saveFile(name) {
  return superclass => class SaveFileBehaviour extends superclass {
    process(req) {
      if (req.files?.[name]) {
      // set image name on values for filename extension validation
      // N:B validation controller gets values from
      // req.form.values and not on req.files
        req.form.values[name] = req.files[name].name;
        req.log('info', `Reference: ${req.sessionModel.get('reference')}, Processing image: ${req.form.values[name]}`);
      }
      return super.process.apply(this, arguments);
    }

    locals(req, res, next) {
      if (!Object.keys(req.form.errors).length) {
        req.form.values[name] = null;
      }
      const maxNum = fileSizeNum(fileUploadConfig.maxFileSize);
      const maxSize = fileUploadConfig.maxFileSize.match(/[a-zA-Z]+/g)[0].toUpperCase();
      return {
        ...super.locals(req, res, next),
        maxFileSize: `${maxNum} ${maxSize}`
      };
    }

    validateField(key, req) {
      if (req.form.values[key]) {
        const fileUpload = _.get(req.files, name);
        if (fileUpload) {
          const uploadSize = fileUpload.size;
          const mimetype = fileUpload.mimetype;
          const uploadSizeTooBig = uploadSize > (fileSizeNum(fileUploadConfig.maxFileSize) * 1000000);
          const uploadSizeBeyondServerLimits = uploadSize === null;
          const invalidMimetype = !fileUploadConfig.allowedMimeTypes.includes(mimetype);
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
      const file = _.get(req.files, name);
      if (!file) {
        return super.saveValues(req, res, next);
      }

      req.log('info', `Reference: ${req.sessionModel.get('reference')}, Saving image: ${file.name}`);
      const model = new Model(_.pick(file, ['name', 'data', 'mimetype']));

      return model.save()
        .then(() => {
          const images = req.sessionModel.get('images') || [];
          req.sessionModel.set('images', [...images, model.toJSON()]);
          super.saveValues(req, res, next);
        })
        .catch(next);
    }
  };
};
