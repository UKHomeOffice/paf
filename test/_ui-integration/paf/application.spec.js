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
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-children');
  });

  it('goes to the when-crime-happened page', async () => {
    const URI = '/crime-children';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/when-crime-happened');
  });

  it('goes to the crime-transport page', async () => {
    const URI = '/when-crime-happened';
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

  it('goes to the crime-location page', async () => {
    const URI = '/crime-delivery';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/crime-location');
  });

  it('goes to the report-person page', async () => {
    const URI = '/crime-location';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-person');
  });

  it('goes to the report-organisation page', async () => {
    const URI = '/report-person';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/report-organisation');
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

  it('goes to the other-info-file-upload page', async () => {
    const URI = '/other-info-another-crime';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/other-info-file-upload');
  });

  it('goes to the about-you page', async () => {
    const URI = '/other-info-file-upload';
    await initSession(URI);
    const response = await passStep(URI, {});
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

  it('goes to the how-do-you-know-person page', async () => {
    const URI = '/have-you-reported-before';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /paf/how-do-you-know-person');
  });

  it('goes to the can-use-info-without-risk page', async () => {
    const URI = '/how-do-you-know-person';
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
