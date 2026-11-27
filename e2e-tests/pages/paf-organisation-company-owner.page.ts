import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyOwnerPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Company owner – GOV.UK"
      : "Company owner – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerOrganisationOwnerKnowledge(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    if (value.trim().toLowerCase() === 'yes') {
      await this.selectByLabel('Yes');
      await this.fillIfPresent('company-owner', c.TEXT);
      await this.clickContinueButton();
    } else {
      await this.answerYesNoUnknown(value);
    }
  }
}
