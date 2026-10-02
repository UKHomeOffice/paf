import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeAnotherLocationPage extends basePage {
  readonly expectedPageTitle = 'Do you want to tell us about another location where the crime is taking place?';
  readonly pageHeading = this.headerText;

  async answerAnotherCrimeLocation(value: string) {
    if (value.trim().toLowerCase() === 'n/a') return;

    await this.assertPageTitle(this.expectedPageTitle);
    if (value.trim().toLowerCase() === 'yes') {
      await this.crimeAnotherLocationYesAnswer(c);
    } else {
      await this.crimeAnotherLocationNoAnswer();
    }
  }

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
