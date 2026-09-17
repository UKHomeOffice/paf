import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyAddressPage extends basePage {
  readonly expectedPageTitle = "What is the institution's address";
  readonly pageHeading = this.headerText;
  async personStudyAddressAnswer() { await this.fillMany(['report-person-study-address-line1', 'report-person-study-address-line2', 'report-person-study-address-town', 'report-person-study-address-county'], c.ADDRESS_LINE_1); await this.fillIfPresent('report-person-study-address-postcode', c.POSTCODE); await this.clickContinueButton(); }
}


