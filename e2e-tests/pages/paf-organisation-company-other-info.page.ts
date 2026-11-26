import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyOtherInfoPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Please tell us anything else about the company, business or education provider that you think we should know – GOV.UK"
      : "Please tell us anything else about the company, business or education provider that you think we should know – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAdditionalOrganisationInformation() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.organisationCompanyOtherInfoAnswer(c);
  }

  async organisationCompanyOtherInfoAnswer(data: Record<string, string>) {
    await this.completeTextPage(['company-other-info'], data.TEXT);
  }
}
