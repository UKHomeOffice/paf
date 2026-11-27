import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyContactPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the institution's contact details (if known)? – GOV.UK"
      : "What is the institution's contact details (if known)? – GOV.UK";
  }

  async answerInstitutionContactDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillIfPresent('report-person-study-telephone', c.TELEPHONE);
    await this.fillIfPresent('report-person-study-email', c.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
