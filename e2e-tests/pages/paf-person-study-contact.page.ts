import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyContactPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the institution's contact details (if known)? – GOV.UK"
      : "What is the institution's contact details (if known)? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerInstitutionContactDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personStudyContactDetailsAnswer(c);
  }
  
  async personStudyContactDetailsAnswer(data: Record<string, string>) {
    await this.fillIfPresent('report-person-study-telephone', data.TELEPHONE);
    await this.fillIfPresent('report-person-study-email', data.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
