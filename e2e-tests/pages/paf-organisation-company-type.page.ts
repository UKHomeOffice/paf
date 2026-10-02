import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyTypePage extends basePage {
  readonly expectedPageTitle = 'What is the type of company, business or education provider?';
  readonly pageHeading = this.headerText;

  async answerOrganisationType() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.organisationCompanyTypeAnswer(c);
  }

  async organisationCompanyTypeAnswer(data: Record<string, string>) {
    await this.autocompleteById('company-types', data.ORGANISATION_TYPE);
    await this.clickContinueButton();
  }
}
