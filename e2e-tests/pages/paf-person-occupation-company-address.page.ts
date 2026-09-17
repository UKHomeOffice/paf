import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationCompanyAddressPage extends basePage {
  readonly expectedPageTitle = "What is the company's contact details";
  readonly pageHeading = this.headerText;
  async personOccupationCompanyAddressUkAnswer() { await this.fillMany(['report-person-occupation-company-address-line1', 'report-person-occupation-company-address-line2', 'report-person-occupation-company-address-town', 'report-person-occupation-company-address-county'], c.ADDRESS_LINE_1); await this.fillIfPresent('report-person-occupation-company-address-postcode', c.POSTCODE); await this.fillIfPresent('report-person-occupation-company-phone', c.TELEPHONE); await this.fillIfPresent('report-person-occupation-company-email', c.SAS_HOF_EMAIL); await this.clickContinueButton(); }
}


