import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyNamePage extends basePage {
  readonly expectedPageTitle = 'What is the company, business or education provider';
  readonly pageHeading = this.headerText;

  async answerOrganisationName() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.organisationCompanyNameAnswer(c);
  }

  async organisationCompanyNameAnswer(data: Record<string, string>) {
    await this.completeTextPage(['organisation-company-name'], data.COMPANY_NAME);
  }
}
