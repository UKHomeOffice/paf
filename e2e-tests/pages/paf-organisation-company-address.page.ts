import { basePage } from './base-page';

export class pafOrganisationCompanyAddressPage extends basePage {
  readonly expectedPageTitle = 'What is the address of the company, business or education provider';
  readonly pageHeading = this.headerText;
  async organisationCompanyAddressAnswer(data: Record<string, string>) {
    await this.fillMany(
      ['company-address-line1', 'company-address-line2', 'company-town', 'company-county'],
      data.ADDRESS_LINE_1
    );
    await this.fillIfPresent('company-postcode', data.POSTCODE);
    await this.clickContinueButton();
  }
}
