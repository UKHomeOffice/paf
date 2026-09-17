import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyAddressPage extends basePage {
  readonly expectedPageTitle = 'What is the address of the company, business or education provider';
  readonly pageHeading = this.headerText;
  async organisationCompanyAddressAnswer() { await this.fillMany(['company-address-line1', 'company-address-line2', 'company-town', 'company-county'], c.ADDRESS_LINE_1); await this.fillIfPresent('company-postcode', c.POSTCODE); await this.clickContinueButton(); }
}


