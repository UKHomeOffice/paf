import { basePage } from './base-page';

export class pafCrimeLocationPage extends basePage {
  readonly expectedPageTitle = 'Do you know where the crime takes place, took place or will take place?';
  readonly pageHeading = this.headerText;
  async crimeLocationYesAnswer(data: Record<string, string>) {
    await this.selectByLabel('Yes');
    await this.fillMany(
      [
        'crime-location-address-line1',
        'crime-location-address-line2',
        'crime-location-address-town',
        'crime-location-address-county'
      ],
      data.ADDRESS_LINE_1
    );
    await this.fillIfPresent('crime-location-address-postcode', data.POSTCODE);
    await this.fillIfPresent('crime-location-phone', data.TELEPHONE);
    await this.autocompleteById('crime-location-country', data.COUNTRY_UK);
    await this.clickContinueButton();
  }
  async crimeLocationNoAnswer() {
    await this.selectAndContinue('No');
  }
}
