describe('the journey of a paf application', () => {
  let testApp;
  let passStep;
  let initSession;

  const SUBAPP = 'paf';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
  });

  it('goes to the crime-children page', async () => {
    const URI = '/crime-type';
    await initSession(URI);
    const response = await passStep(URI, {
      'crime-type': 'immigration-crime',
      'immigration-crime-group': 'immigration-crime-fake-marriage'

    });
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-children');
  });

  it('goes to the when-crime-happened page', async () => {
    const URI = '/crime-children';
    await initSession(URI);
    const response = await passStep(URI, {
      'crime-children': 'yes'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/when-crime-happened');
  });
  it('goes to the when-will-crime-happen page', async () => {
    const URI = '/when-crime-happened';
    await initSession(URI);
    const response = await passStep(URI, {
      'when-crime-happened': 'not-yet-happened'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/when-will-crime-happen');
  });
  it('goes to the date-time-crime-will-happen page', async () => {
    const URI = '/when-will-crime-happen';
    await initSession(URI);
    const response = await passStep(URI, {
      'when-will-crime-happen': 'more-than-twenty-four-hours'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/date-time-crime-will-happen');
  });
  it('goes to the when-will-crime-happen-more-info page', async () => {
    const URI = '/date-time-crime-will-happen';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/when-will-crime-happen-more-info');
  });
  it('goes to the crime-transport page', async () => {
    const URI = '/when-will-crime-happen-more-info';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-transport');
  });
  it('goes to the crime-delivery page', async () => {
    const URI = '/crime-transport';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-delivery');
  });

  it('goes to the crime-transport-vehicle-type page', async () => {
    const URI = '/crime-transport';
    await initSession(URI);
    const response = await passStep(URI, {
      'crime-transport': 'yes',
      'transport-group': 'crime-transport-vehicle'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-transport-vehicle-type');
  });

  it('goes to the crime-transport-vehicle-details page', async () => {
    const URI = '/crime-transport-vehicle-type';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-transport-vehicle-details');
  });
  it('goes to the crime-transport-boat-type page', async () => {
    const URI = '/crime-transport';
    await initSession(URI);
    const response = await passStep(URI, {
      'crime-transport': 'yes',
      'transport-group': 'crime-transport-boat'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-transport-boat-type');
  });

  it('goes to the crime-transport-boat-details page', async () => {
    const URI = '/crime-transport-boat-type';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-transport-boat-details');
  });

  it('goes to the crime-transport-train-details  page', async () => {
    const URI = '/crime-transport';
    await initSession(URI);
    const response = await passStep(URI, {
      'crime-transport': 'yes',
      'transport-group': 'crime-transport-train'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-transport-train-details');
  });

  it('goes to the crime-transport-aeroplane-details page', async () => {
    const URI = '/crime-transport';
    await initSession(URI);
    const response = await passStep(URI, {
      'crime-transport': 'yes',
      'transport-group': 'crime-transport-aeroplane'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-transport-aeroplane-details');
  });

  it('goes to the crime-location page', async () => {
    const URI = '/crime-delivery';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-location');
  });

  it('goes to the crime-another-location page', async () => {
    const URI = '/crime-location';
    await initSession(URI);
    const response = await passStep(URI, {
      'crime-location': 'yes'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-another-location');
  });

  it('goes to the report-person page', async () => {
    const URI = '/crime-another-location';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person');
  });

  it('goes to the report-person-name page', async () => {
    const URI = '/report-person';
    await initSession(URI);
    const response = await passStep(URI, {
      'report-person': 'yes'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-name');
  });

  it('goes to the report-person-dob page', async () => {
    const URI = '/report-person-name';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-dob');
  });

  it('goes to the report-person-age-range page', async () => {
    const URI = '/report-person-dob';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-age-range');
  });

  it('goes to the report-person-nationality page', async () => {
    const URI = '/report-person-age-range';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-nationality');
  });

  it('goes to the report-person-place-of-birth page', async () => {
    const URI = '/report-person-nationality';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-place-of-birth');
  });

  it('goes to the report-person-gender page', async () => {
    const URI = '/report-person-place-of-birth';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-gender');
  });

  it('goes to the report-person-id page', async () => {
    const URI = '/report-person-gender';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-id');
  });

  it('goes to the report-person-location page', async () => {
    const URI = '/report-person-id';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-location');
  });

  it('goes to the report-person-occupation page', async () => {
    const URI = '/report-person-location';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-occupation');
  });

  it('goes to the report-person-study page', async () => {
    const URI = '/report-person-occupation';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-study');
  });

  it('goes to the report-person-transport page', async () => {
    const URI = '/report-person-study';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-transport');
  });

  it('goes to the report-person-description page', async () => {
    const URI = '/report-person-transport';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person-description');
  });

  it('goes to the has-additionalPerson page', async () => {
    const URI = '/report-person-description';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/has-additionalPerson');
  });

  it('goes to the person-details page when the user has additional people to add', async () => {
    const URI = '/has-additionalPerson';
    await initSession(URI);
    const response = await passStep(URI, {
      hasAdditionalPerson: 'yes'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/person-details');
  });

  it('goes to the report-organisation page when the user has no additional people to add', async () => {
    const URI = '/has-additionalPerson';
    await initSession(URI);
    const response = await passStep(URI, {
      hasAdditionalPerson: 'no'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/report-organisation');
  });

  it('goes to the company-name page', async () => {
    const URI = '/report-organisation';
    await initSession(URI);
    const response = await passStep(URI, {'report-organisation': 'yes'});
    expect(response.text).to.contain('Found. Redirecting to /paf/company-name');
  });

  it('goes to the company-address page', async () => {
    const URI = '/company-name';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/company-address');
  });

  it('goes to the company-contact page', async () => {
    const URI = '/company-address';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/company-contact');
  });

  it('goes to the company-types page', async () => {
    const URI = '/company-contact';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/company-types');
  });

  it('goes to the company-owner page', async () => {
    const URI = '/company-types';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/company-owner');
  });

  it('goes to the company-other-info page', async () => {
    const URI = '/company-owner';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/company-other-info');
  });

  it('goes to the another-company page', async () => {
    const URI = '/company-other-info';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/another-company');
  });

  it('goes to the other-info-description page', async () => {
    const URI = '/report-organisation';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/other-info-description');
  });

  it('goes to the other-info-another-crime page', async () => {
    const URI = '/other-info-description';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/other-info-another-crime');
  });

  it('goes to the company-name page', async () => {
    const URI = '/report-organisation';
    await initSession(URI);
    const response = await passStep(URI, {'report-organisation': 'yes'});
    expect(response.text).to.contain('Found. Redirecting to /paf/company-name');
  });

  it('goes to the other-info-file-upload page', async () => {
    const URI = '/other-info-another-crime';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/other-info-file-upload');
  });

  it('goes to the add-other-info-file-upload page', async () => {
    const URI = '/other-info-file-upload';
    await initSession(URI);
    const response = await passStep(URI, {
      'other-info-file-upload': {
        name: 'story.png',
        encoding: '7bit',
        mimetype: 'png',
        truncated: false,
        size: 144148
      }
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/add-other-info-file-upload');
  });

  it('goes to the about-you page', async () => {
    const URI = '/add-other-info-file-upload';
    await initSession(URI);
    const response = await passStep(URI, {
      'other-info-file-uploads-add-another': 'no'
    });
    expect(response.text).to.contain('Found. Redirecting to /paf/about-you');
  });

  it('goes to the does-anyone-else-know page', async () => {
    const URI = '/about-you';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/does-anyone-else-know');
  });

  it('goes to the have-you-reported-before page', async () => {
    const URI = '/does-anyone-else-know';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/have-you-reported-before');
  });

  it('goes to the how-do-you-know-the-person page', async () => {
    const URI = '/have-you-reported-before';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/how-do-you-know-the-person');
  });

  it('goes to the can-use-info-without-risk page', async () => {
    const URI = '/how-do-you-know-the-person';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/can-use-info-without-risk');
  });

  it('goes to the about-you-details page', async () => {
    const URI = '/can-use-info-without-risk';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/about-you-details');
  });

  it('goes to the about-you-dob page', async () => {
    const URI = '/about-you-details';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/about-you-dob');
  });

  it('goes to the about-you-nationality page', async () => {
    const URI = '/about-you-dob';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/about-you-nationality');
  });

  it('goes to the about-you-gender page', async () => {
    const URI = '/about-you-nationality';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/about-you-gender');
  });

  it('goes to the about-you-contact page', async () => {
    const URI = '/about-you-gender';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/about-you-contact');
  });

  it('goes to the are-you-eighteen page', async () => {
    const URI = '/about-you-contact';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/confirm');
  });

  it('goes to the confirm page', async () => {
    const URI = '/are-you-eighteen';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/confirm');
  });

  it('goes to the declaration page', async () => {
    const URI = '/confirm';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/declaration');
  });

  it('goes to the confirmation page', async () => {
    const URI = '/declaration';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/confirmation');
  });
});
