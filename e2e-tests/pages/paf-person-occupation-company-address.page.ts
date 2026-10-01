import { basePage } from './base-page';

export class pafPersonOccupationCompanyAddressPage extends basePage {
  readonly expectedPageTitle = "What is the company's contact details";
  readonly pageHeading = this.headerText;
  async personOccupationCompanyAddressUkAnswer(data: Record<string, string>) {
    await this.fillMany(
      [
        'report-person-occupation-company-address-line1',
        'report-person-occupation-company-address-line2',
        'report-person-occupation-company-address-town',
        'report-person-occupation-company-address-county'
      ],
      data.ADDRESS_LINE_1
    );
    await this.fillIfPresent('report-person-occupation-company-address-postcode', data.POSTCODE);
    await this.fillIfPresent('report-person-occupation-company-phone', data.TELEPHONE);
    await this.fillIfPresent('report-person-occupation-company-email', data.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
