import { basePage } from './base-page';

export class pafAdditionalPersonDobPage extends basePage {
  readonly expectedPageTitle = "What is the person's date of birth?";
  readonly pageHeading = this.headerText;
  async additionalPersonReportDobAnswer(data: Record<string, string>) {
    await this.fillDateByPrefix('personAddDob', data.DOB);
    await this.clickContinueButton();
  }
}
