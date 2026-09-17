import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonNamePage extends basePage {
  readonly expectedPageTitle = "What is the person's name?";
  readonly pageHeading = this.headerText;
  async personReportNameAnswer() { await this.fillIfPresent('report-person-first-name', c.FIRST_NAME); await this.fillIfPresent('report-person-family-name', c.LAST_NAME); await this.fillIfPresent('report-person-nickname', c.NICKNAME); await this.clickContinueButton(); }
}


