import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyInstitutionOwnerPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Institution Owner – GOV.UK"
      : "Institution Owner – GOV.UK";
  }

  async answerInstitutionOwnerKnowledge(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    if (value.trim().toLowerCase() === 'yes') {
      await this.selectByLabel('Yes');
      await this.fillIfPresent('report-person-study-institution-owner', c.TEXT);
      await this.clickContinueButton();
    } else {
      await this.answerYesNoUnknown(value);
    }
  }
}
