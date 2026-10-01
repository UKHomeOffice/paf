import { basePage } from './base-page';

export class pafPersonAddressUkPage extends basePage {
  readonly expectedPageTitle = "What is the person's address (UK)?";
  readonly pageHeading = this.headerText;
  async personAddressUkAnswer(data: Record<string, string>) {
    await this.fillMany(
      [
        'report-person-location-uk-address-line1',
        'report-person-location-uk-address-line2',
        'report-person-location-uk-address-town',
        'report-person-location-uk-address-county'
      ],
      data.ADDRESS_LINE_1
    );
    await this.fillIfPresent('report-person-location-uk-address-postcode', data.POSTCODE);
    await this.clickContinueButton();
  }
}
