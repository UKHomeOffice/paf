'use strict';

module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    if (req.query.delete) {
      const images = req.sessionModel.get('images') || [];
      const remaining = images.filter(i => i.id !== req.query.delete);
      req.log('info', `Reference: ${req.sessionModel.get('reference')}, Removing image: ${req.query.delete}`);
      req.sessionModel.set('images', remaining);
      const path = req.baseUrl + req.path;
      return res.redirect(path);
    }
    return super.configure(req, res, next);
  }
};
