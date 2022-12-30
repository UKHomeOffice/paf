module.exports = superclass => class extends superclass {
  validate(req, res, next) {
    const images = req.sessionModel.get('images');
    if (images && images.length === 3 && req.form.values['other-info-file-uploads-add-another'] === 'yes') {
      return next({
        'other-info-file-uploads-add-another': new this.ValidationError(
          'other-info-file-uploads-add-another',
          {
            type: 'tooMany'
          }
        )
      });
    } super.validate(req, res, next);
    return next;
  }
};
