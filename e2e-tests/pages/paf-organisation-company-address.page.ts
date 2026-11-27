import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyAddressPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the address of the company, business or education provider (if known)? – GOV.UK"
      : "What is the address of the company, business or education provider (if known)? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerOrganisationAddress() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillMany(
      ['company-address-line1', 'company-address-line2', 'company-town', 'company-county'],
      c.ADDRESS_LINE_1
    );
    await this.fillIfPresent('company-postcode', c.POSTCODE);
    await this.clickContinueButton();
  }
}
