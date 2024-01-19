module.exports = superclass => class extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);
    const images = req.sessionModel.get('images');
    if (images && images.length >= 3) {
    // disable file upload if attachment limit reached.
      req.form.options.fields['other-info-file-upload'].attributes = [{attribute: 'disabled'}];
      return locals;
    }
    req.form.options.fields['other-info-file-upload'].attributes = [];
    return locals;
  }
};
