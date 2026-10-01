import { basePage } from './base-page';

export class pafOrganisationCompanyTypePage extends basePage {
  readonly expectedPageTitle = 'What is the type of company, business or education provider?';
  readonly pageHeading = this.headerText;
  async organisationCompanyTypeAnswer(data: Record<string, string>) {
    await this.autocompleteById('company-types', data.ORGANISATION_TYPE);
    await this.clickContinueButton();
  }
}
