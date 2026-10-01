import { basePage } from './base-page';

export class pafCrimeAnotherLocationPage extends basePage {
  readonly expectedPageTitle = 'Do you want to tell us about another location where the crime is taking place?';
  readonly pageHeading = this.headerText;
  async crimeAnotherLocationYesAnswer(data: Record<string, string>) {
    await this.selectByLabel('Yes');
    await this.fillMany(
      [
        'crime-another-location-address-line1',
        'crime-another-location-address-line2',
        'crime-another-location-address-town',
        'crime-another-location-address-county'
      ],
      data.ADDRESS_LINE_1
    );
    await this.fillIfPresent('crime-another-location-address-postcode', data.POSTCODE);
    await this.fillIfPresent('crime-another-location-phone', data.TELEPHONE);
    await this.autocompleteById('crime-another-location-country', data.COUNTRY_UK);
    await this.clickContinueButton();
  }
  async crimeAnotherLocationNoAnswer() {
    await this.selectAndContinue('No');
  }
}
