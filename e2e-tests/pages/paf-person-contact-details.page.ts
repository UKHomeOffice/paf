import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonContactDetailsPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's contact details (if known) – GOV.UK"
      : "What is the person's contact details (if known) – GOV.UK";
  }

  async answerPersonContactDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillIfPresent('report-person-location-mobile', c.TELEPHONE);
    await this.fillIfPresent('report-person-location-phone', c.TELEPHONE);
    await this.fillIfPresent('report-person-location-email', c.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
