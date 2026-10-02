import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyAddressPage extends basePage {
  readonly expectedPageTitle = "What is the institution's address";
  readonly pageHeading = this.headerText;

  async answerInstitutionAddress() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personStudyAddressAnswer(c);
  }
  
  async personStudyAddressAnswer(data: Record<string, string>) {
    await this.fillMany(
      [
        'report-person-study-address-line1',
        'report-person-study-address-line2',
        'report-person-study-address-town',
        'report-person-study-address-county'
      ],
      data.ADDRESS_LINE_1
    );
    await this.fillIfPresent('report-person-study-address-postcode', data.POSTCODE);
    await this.clickContinueButton();
  }
}
