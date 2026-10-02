import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyInstitutionOwnerPage extends basePage {
  readonly expectedPageTitle = 'Institution Owner';
  readonly pageHeading = this.headerText;

  async answerInstitutionOwnerKnowledge(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    if (value.trim().toLowerCase() === 'yes') {
      await this.personStudyInstitutionOwnerYesAnswer(c);
    } else {
      await this.answerYesNoUnknown(value);
    }
  }
  
  async personStudyInstitutionOwnerYesAnswer(data: Record<string, string>) {
    await this.selectByLabel('Yes');
    await this.fillIfPresent('report-person-study-institution-owner', data.TEXT);
    await this.clickContinueButton();
  }
}
