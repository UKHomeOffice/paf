import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAdditionalPersonDobPage extends basePage {
  readonly expectedPageTitle = "What is the person's date of birth?";
  readonly pageHeading = this.headerText;
  async additionalPersonReportDobAnswer() { await this.fillDateByPrefix('personAddDob', c.DOB); await this.clickContinueButton(); }
}


