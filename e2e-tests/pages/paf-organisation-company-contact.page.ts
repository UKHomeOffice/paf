import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyContactPage extends basePage {
  readonly expectedPageTitle = "Enter the company, business or education provider's contact details";
  readonly pageHeading = this.headerText;
  async organisationContactDetailsAnswer() { await this.fillIfPresent('company-phone', c.TELEPHONE); await this.fillIfPresent('company-email', c.SAS_HOF_EMAIL); await this.fillIfPresent('company-website', c.WEBSITE); await this.clickContinueButton(); }
}


