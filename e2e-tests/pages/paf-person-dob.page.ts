import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonDobPage extends basePage {
  readonly expectedPageTitle = "What is the person's date of birth?";
  readonly pageHeading = this.headerText;

  async answerPersonDateOfBirth() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personReportDobAnswer(c);
  }
  
  async personReportDobAnswer(data: Record<string, string>) {
    await this.fillDateByPrefix('report-person-dob', data.DOB);
    await this.clickContinueButton();
  }
}
