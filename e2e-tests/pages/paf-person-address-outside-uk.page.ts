import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonAddressOutsideUkPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's address (Outside UK)? – GOV.UK"
      : "What is the person's address (Outside UK)? – GOV.UK";
  }

  async answerPersonAddressOutsideUk() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillMany(
      [
        'report-person-location-outside-uk-address-line1',
        'report-person-location-outside-uk-address-line2',
        'report-person-location-outside-uk-address-town',
        'report-person-location-outside-uk-address-county',
        'report-person-location-outside-uk-address-postcode'
      ],
      c.ADDRESS_LINE_1
    );
    await this.autocompleteById('report-person-location-outside-uk-address-country', c.COUNTRY);
    await this.clickContinueButton();
  }
}