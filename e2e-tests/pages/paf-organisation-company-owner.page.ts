import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyOwnerPage extends basePage {
  readonly expectedPageTitle = 'Company owner';
  readonly pageHeading = this.headerText;

  async answerOrganisationOwnerKnowledge(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    if (value.trim().toLowerCase() === 'yes') {
      await this.organisationCompanyOwnerYesAnswer(c);
    } else {
      await this.answerYesNoUnknown(value);
    }
  }

  async organisationCompanyOwnerYesAnswer(data: Record<string, string>) {
    await this.selectByLabel('Yes');
    await this.fillIfPresent('company-owner', data.TEXT);
    await this.clickContinueButton();
  }
}
