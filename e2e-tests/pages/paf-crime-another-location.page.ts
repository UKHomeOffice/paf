import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeAnotherLocationPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Do you want to tell us about another location where the crime is taking place? – GOV.UK"
      : "Do you want to tell us about another location where the crime is taking place? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAnotherCrimeLocation(value: string) {
    if (value.trim().toLowerCase() === 'n/a') return;

    await this.assertPageTitle(await this.expectedPageTitle());
    if (value.trim().toLowerCase() === 'yes') {
      await this.selectByLabel('Yes');
      await this.fillMany(
        [
          'crime-another-location-address-line1',
          'crime-another-location-address-line2',
          'crime-another-location-address-town',
          'crime-another-location-address-county'
        ],
        c.ADDRESS_LINE_1
      );
      await this.fillIfPresent('crime-another-location-address-postcode', c.POSTCODE);
      await this.fillIfPresent('crime-another-location-phone', c.TELEPHONE);
      await this.autocompleteById('crime-another-location-country', c.COUNTRY_UK);
      await this.clickContinueButton();
    } else {
      await this.crimeAnotherLocationNoAnswer();
    }
  }
  async crimeAnotherLocationNoAnswer() {
    await this.selectAndContinue('No');
  }
}
