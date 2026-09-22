import { basePage } from './base-page';

export class pafOrganisationCompanyTypePage extends basePage {
  readonly expectedPageTitle = 'What is the type of company, business or education provider?';
  readonly pageHeading = this.headerText;
  async organisationCompanyTypeAnswer() { await this.autocompleteById('company-types', 'Restaurant'); await this.clickContinueButton(); }
}


