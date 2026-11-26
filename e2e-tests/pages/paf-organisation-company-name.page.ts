import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyNamePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the company, business or education provider (if known)? – GOV.UK"
      : "What is the company, business or education provider (if known)? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerOrganisationName() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.organisationCompanyNameAnswer(c);
  }

  async organisationCompanyNameAnswer(data: Record<string, string>) {
    await this.completeTextPage(['organisation-company-name'], data.COMPANY_NAME);
  }
}
