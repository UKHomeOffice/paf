import { basePage } from './base-page';

export class pafOrganisationCompanyNamePage extends basePage {
  readonly expectedPageTitle = 'What is the company, business or education provider';
  readonly pageHeading = this.headerText;
  async organisationCompanyNameAnswer(data: Record<string, string>) {
    await this.completeTextPage(['organisation-company-name'], data.COMPANY_NAME);
  }
}
