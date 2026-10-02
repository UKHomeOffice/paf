import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAdditionalPersonDobPage extends basePage {
  readonly expectedPageTitle = "What is the person's date of birth?";
  readonly pageHeading = this.headerText;

  async answerAdditionalPersonDateOfBirth() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.additionalPersonReportDobAnswer(c);
  }

  async additionalPersonReportDobAnswer(data: Record<string, string>) {
    await this.fillDateByPrefix('personAddDob', data.DOB);
    await this.clickContinueButton();
  }
}
