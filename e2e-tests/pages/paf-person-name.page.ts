import { basePage } from './base-page';

export class pafPersonNamePage extends basePage {
  readonly expectedPageTitle = "What is the person's name?";
  readonly pageHeading = this.headerText;
  async personReportNameAnswer(data: Record<string, string>) {
    await this.fillIfPresent('report-person-first-name', data.FIRST_NAME);
    await this.fillIfPresent('report-person-family-name', data.LAST_NAME);
    await this.fillIfPresent('report-person-nickname', data.NICKNAME);
    await this.clickContinueButton();
  }
}
