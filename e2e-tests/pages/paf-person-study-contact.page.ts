import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyContactPage extends basePage {
  readonly expectedPageTitle = "What is the institution's contact details";
  readonly pageHeading = this.headerText;

  async answerInstitutionContactDetails() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personStudyContactDetailsAnswer(c);
  }
  
  async personStudyContactDetailsAnswer(data: Record<string, string>) {
    await this.fillIfPresent('report-person-study-telephone', data.TELEPHONE);
    await this.fillIfPresent('report-person-study-email', data.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
