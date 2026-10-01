import { basePage } from './base-page';

export class pafOrganisationCompanyOtherInfoPage extends basePage {
  readonly expectedPageTitle =
    'Please tell us anything else about the company, business or education provider that you think we should know';
  readonly pageHeading = this.headerText;
  async organisationCompanyOtherInfoAnswer(data: Record<string, string>) {
    await this.completeTextPage(['company-other-info'], data.TEXT);
  }
}
