import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonDobPage extends basePage {
  readonly expectedPageTitle = "What is the person's date of birth?";
  readonly pageHeading = this.headerText;
  async personReportDobAnswer() { await this.fillDateByPrefix('report-person-dob', c.DOB); await this.clickContinueButton(); }
}


