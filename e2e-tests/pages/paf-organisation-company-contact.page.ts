import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyContactPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Enter the company, business or education provider's contact details (if known) – GOV.UK"
      : "Enter the company, business or education provider's contact details (if known) – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerOrganisationContactDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillIfPresent('company-phone', c.TELEPHONE);
    await this.fillIfPresent('company-email', c.SAS_HOF_EMAIL);
    await this.fillIfPresent('company-website', c.WEBSITE);
    await this.clickContinueButton();
  }
}
