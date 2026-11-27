import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyAddressPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the institution's address (if known)? – GOV.UK"
      : "What is the institution's address (if known)? – GOV.UK";
  }

  async answerInstitutionAddress() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillMany(
      [
        'report-person-study-address-line1',
        'report-person-study-address-line2',
        'report-person-study-address-town',
        'report-person-study-address-county'
      ],
      c.ADDRESS_LINE_1
    );
    await this.fillIfPresent('report-person-study-address-postcode', c.POSTCODE);
    await this.clickContinueButton();
  }
}
