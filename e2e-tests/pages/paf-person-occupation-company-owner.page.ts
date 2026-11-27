import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationCompanyOwnerPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Company Owner – GOV.UK"
      : "Company Owner – GOV.UK";
  }

  async answerCompanyOwnerKnowledge(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    if (value.trim().toLowerCase() === 'yes') {
      await this.selectByLabel('Yes');
      await this.fillIfPresent('report-person-occupation-company-owner', c.TEXT);
      await this.clickContinueButton();
    } else {
      await this.answerYesNoUnknown(value);
    }
  }
}
