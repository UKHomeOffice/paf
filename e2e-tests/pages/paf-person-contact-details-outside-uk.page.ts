import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonContactDetailsOutsideUkPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's contact details (if known) – GOV.UK"
      : "What is the person's contact details (if known) – GOV.UK";
  }

  async answerPersonContactDetailsOutsideUk() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillIfPresent('report-person-location-outside-uk-mobile', c.TELEPHONE);
    await this.fillIfPresent('report-person-location-outside-uk-phone', c.TELEPHONE);
    await this.fillIfPresent('report-person-location-outside-uk-email', c.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
