import { basePage } from './base-page';

export class pafPersonStudyContactPage extends basePage {
  readonly expectedPageTitle = "What is the institution's contact details";
  readonly pageHeading = this.headerText;
  async personStudyContactDetailsAnswer(data: Record<string, string>) {
    await this.fillIfPresent('report-person-study-telephone', data.TELEPHONE);
    await this.fillIfPresent('report-person-study-email', data.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
