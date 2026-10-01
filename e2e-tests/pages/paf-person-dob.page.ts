import { basePage } from './base-page';

export class pafPersonDobPage extends basePage {
  readonly expectedPageTitle = "What is the person's date of birth?";
  readonly pageHeading = this.headerText;
  async personReportDobAnswer(data: Record<string, string>) {
    await this.fillDateByPrefix('report-person-dob', data.DOB);
    await this.clickContinueButton();
  }
}
