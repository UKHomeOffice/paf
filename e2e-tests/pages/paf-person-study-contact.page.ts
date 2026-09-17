import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyContactPage extends basePage {
  readonly expectedPageTitle = "What is the institution's contact details";
  readonly pageHeading = this.headerText;
  async personStudyContactDetailsAnswer() { await this.fillIfPresent('report-person-study-telephone', c.TELEPHONE); await this.fillIfPresent('report-person-study-email', c.SAS_HOF_EMAIL); await this.clickContinueButton(); }
}


