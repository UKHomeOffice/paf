import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonNamePage extends basePage {
  readonly expectedPageTitle = "What is the person's name?";
  readonly pageHeading = this.headerText;

  async answerPersonName() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personReportNameAnswer(c);
  }
  
  async personReportNameAnswer(data: Record<string, string>) {
    await this.fillIfPresent('report-person-first-name', data.FIRST_NAME);
    await this.fillIfPresent('report-person-family-name', data.LAST_NAME);
    await this.fillIfPresent('report-person-nickname', data.NICKNAME);
    await this.clickContinueButton();
  }
}
