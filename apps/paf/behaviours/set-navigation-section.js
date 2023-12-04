module.exports = superclass => class extends superclass {
  getValues(req, res, next) {
    return super.getValues(req, res, (err, values) => {
      // Person section - set next property for preceeding pages and set backlink
      if (req.query.section === 'person') {
        req.form.options.steps['/crime-location'].next = '/report-person';
        req.form.options.steps['/crime-another-location'].next = '/report-person';
        res.locals.backLink = 'crime-type';
      }
      if (req.form.options.route === '/crime-location' || req.form.options.route === '/crime-another-location') {
        req.form.options.next = '/report-person';
      }
      // Add report person page backlink
      if (req.form.options.route === '/report-person') {
        if (req.sessionModel.attributes.steps.includes('/crime-location')) {
          req.form.options.steps['/report-person'].backLink = 'crime-location';
          res.locals.backLink = 'crime-location';
        } else if (req.sessionModel.attributes.steps.includes('/crime-another-location')) {
          req.form.options.steps['/report-person'].backLink = 'crime-another-location';
          res.locals.backLink = 'crime-another-location';
        } else {
          res.locals.backLink = 'crime-type';
        }
      }


      // Organisation section - set next property for preceeding pages and set backlink
      if (req.query.section === 'organisation') {
        req.form.options.steps['/report-person'].next = '/report-organisation';
        req.form.options.steps['/has-additionalPerson'].next = '/report-organisation';
        req.form.options.steps['/person-details'].next = '/report-organisation';
        res.locals.backLink = 'report-person';
      }
      if (req.form.options.route === '/report-person' || req.form.options.route === '/has-additionalPerson' || req.form.options.route === '/person-details') {
        req.form.options.next = '/report-organisation';
      }
      // Add report organisation page backlink
      if (req.form.options.route === '/report-organisation') {
        if (req.sessionModel.attributes.steps.includes('/has-additionalPerson') && !req.sessionModel.attributes.steps.includes('/person-details')) {
          req.form.options.steps['/report-organisation'].backLink = 'has-additionalPerson';
          res.locals.backLink = 'has-additionalPerson';
        } else if (req.sessionModel.attributes.steps.includes('/person-details')) {
          req.form.options.steps['/report-organisation'].backLink = 'person-details';
          res.locals.backLink = 'person-details';
        } else {
          req.form.options.steps['/report-organisation'].backLink = 'report-person';
          res.locals.backLink = 'report-person';
        }
      }


      // Other Info section - set next property for preceeding pages and set backlink
      if (req.query.section === 'other-info') {
        req.form.options.steps['/report-organisation'].next = '/other-info-description';
        req.form.options.steps['/another-company'].next = '/other-info-description';
        res.locals.backLink = 'report-organisation';
      }
      if (req.form.options.route === '/report-organisation' || req.form.options.route === '/another-company') {
        req.form.options.next = '/other-info-description';
      }
      // Add other info page backlink
      if (req.form.options.route === '/other-info-description') {
        if (req.sessionModel.attributes.steps.includes('/another-company')) {
          req.form.options.steps['/other-info-description'].backLink = 'another-company';
          res.locals.backLink = 'another-company';
        } else {
          req.form.options.steps['/other-info-description'].backLink = 'report-organisation';
          res.locals.backLink = 'report-organisation';
        }
      }


      // About You section - set next property for preceeding pages and set backlink
      if (req.query.section === 'about-you') {
        req.form.options.steps['/other-info-file-upload'].next = '/about-you';
        req.form.options.steps['/add-other-info-file-upload'].next = '/about-you';
        res.locals.backLink = 'other-info-description';
      }
      if (req.form.options.route === '/other-info-file-upload' || req.form.options.route === '/add-other-info-file-upload' ) {
        req.form.options.next = '/about-you';
      }
      // Add about you page backlink
      if (req.form.options.route === '/about-you') {
        if (req.sessionModel.attributes.steps.includes('/other-info-file-upload')) {
          req.form.options.steps['/about-you'].backLink = 'other-info-file-upload';
          res.locals.backLink = 'other-info-file-upload';
        }
      }


      // Check Answers section - set next property for preceeding pages and set backlink
      if (req.query.section === 'check-answers') {
        req.form.options.steps['/about-you-contact'].next = '/confirm';
        req.form.options.steps['/are-you-eighteen'].next = '/confirm';
        res.locals.backLink = 'about-you';
      }
      if (req.form.options.route === '/about-you-contact' || req.form.options.route === '/are-you-eighteen') {
        req.form.options.next = '/confirm';
      }
      // Add check answers page backlink
      if (req.form.options.route === '/confirm') {
        if (req.sessionModel.attributes.steps.includes('/are-you-eighteen')) {
          req.form.options.steps['/confirm'].backLink = 'are-you-eighteen';
          res.locals.backLink = 'are-you-eighteen';
        } else if (req.sessionModel.attributes.steps.includes('/about-you-contact')) {
          req.form.options.steps['/confirm'].backLink = 'about-you-contact';
          res.locals.backLink = 'about-you-contact';
        }
      }
      return next(null, values);
    });
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    const crimeType = req.sessionModel.get('crime-type');
    const immmigrationCrime = req.sessionModel.get('immigration-crime-group');
    const smugglingCrime = req.sessionModel.get('smuggling-crime-group');
    const crimeChildren = req.sessionModel.get('crime-children');

    // enable section links once required fields have been completed
    if (crimeType && (immmigrationCrime || smugglingCrime) && crimeChildren) {
      locals.enableSection = true;
      return locals;
    }

    return locals;
  }
};
