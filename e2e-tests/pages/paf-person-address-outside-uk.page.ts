import { basePage } from './base-page';

export class pafPersonAddressOutsideUkPage extends basePage {
  readonly expectedPageTitle = "What is the person's address (Outside UK)?";
  readonly pageHeading = this.headerText;
  async personAddressOutsideUkAnswer(data: Record<string, string>) {
    await this.fillMany(
      [
        'report-person-location-outside-uk-address-line1',
        'report-person-location-outside-uk-address-line2',
        'report-person-location-outside-uk-address-town',
        'report-person-location-outside-uk-address-county',
        'report-person-location-outside-uk-address-postcode'
      ],
      data.ADDRESS_LINE_1
    );
    await this.autocompleteById('report-person-location-outside-uk-address-country', data.COUNTRY);
    await this.clickContinueButton();
  }
}
