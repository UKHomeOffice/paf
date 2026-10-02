import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationCompanyOwnerPage extends basePage {
  readonly expectedPageTitle = 'Company Owner';
  readonly pageHeading = this.headerText;

  async answerCompanyOwnerKnowledge(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    if (value.trim().toLowerCase() === 'yes') {
      await this.personOccupationCompanyOwnerYesAnswer(c);
    } else {
      await this.answerYesNoUnknown(value);
    }
  }
  
  async personOccupationCompanyOwnerYesAnswer(data: Record<string, string>) {
    await this.selectByLabel('Yes');
    await this.fillIfPresent('report-person-occupation-company-owner', data.TEXT);
    await this.clickContinueButton();
  }
}
