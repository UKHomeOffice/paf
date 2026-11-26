import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyTypePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the type of company, business or education provider? – GOV.UK"
      : "What is the type of company, business or education provider? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerOrganisationType() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.organisationCompanyTypeAnswer(c);
  }

  async organisationCompanyTypeAnswer(data: Record<string, string>) {
    await this.autocompleteById('company-types', data.ORGANISATION_TYPE);
    await this.clickContinueButton();
  }
}
