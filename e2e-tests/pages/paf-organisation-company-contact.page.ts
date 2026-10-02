import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyContactPage extends basePage {
  readonly expectedPageTitle = "Enter the company, business or education provider's contact details";
  readonly pageHeading = this.headerText;

  async answerOrganisationContactDetails() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.organisationContactDetailsAnswer(c);
  }

  async organisationContactDetailsAnswer(data: Record<string, string>) {
    await this.fillIfPresent('company-phone', data.TELEPHONE);
    await this.fillIfPresent('company-email', data.SAS_HOF_EMAIL);
    await this.fillIfPresent('company-website', data.WEBSITE);
    await this.clickContinueButton();
  }
}
