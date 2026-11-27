import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeLocationPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Do you know where the crime takes place, took place or will take place? – GOV.UK"
      : "Do you know where the crime takes place, took place or will take place? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerCrimeLocation(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    if (value.trim().toLowerCase() === 'yes') {
      await this.selectByLabel('Yes');
      await this.fillMany(
        [
          'crime-location-address-line1',
          'crime-location-address-line2',
          'crime-location-address-town',
          'crime-location-address-county'
        ],
        c.ADDRESS_LINE_1
      );
      await this.fillIfPresent('crime-location-address-postcode', c.POSTCODE);
      await this.fillIfPresent('crime-location-phone', c.TELEPHONE);
      await this.autocompleteById('crime-location-country', c.COUNTRY_UK);
      await this.clickContinueButton();
    } else {
          await this.selectAndContinue('No');

    }
  }

}
