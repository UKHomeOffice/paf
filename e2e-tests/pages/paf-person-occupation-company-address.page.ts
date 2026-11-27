import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationCompanyAddressPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the company's contact details (if known)? – GOV.UK"
      : "What is the company's contact details (if known)? – GOV.UK";
  }

  async answerEmployerCompanyContactDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillMany(
      [
        'report-person-occupation-company-address-line1',
        'report-person-occupation-company-address-line2',
        'report-person-occupation-company-address-town',
        'report-person-occupation-company-address-county'
      ],
      c.ADDRESS_LINE_1
    );
    await this.fillIfPresent('report-person-occupation-company-address-postcode', c.POSTCODE);
    await this.fillIfPresent('report-person-occupation-company-phone', c.TELEPHONE);
    await this.fillIfPresent('report-person-occupation-company-email', c.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
