import { basePage } from './base-page';

export class pafAdditionalPersonNamePage extends basePage {
  readonly expectedPageTitle = "What is the person's name?";
  readonly pageHeading = this.headerText;
  async additionalPersonReportNameAnswer(data: Record<string, string>) {
    await this.fillIfPresent('personAddFirstName', data.FIRST_NAME);
    await this.fillIfPresent('personAddFamilyName', data.LAST_NAME);
    await this.fillIfPresent('personAddNickname', data.NICKNAME);
    await this.clickContinueButton();
  }
}
