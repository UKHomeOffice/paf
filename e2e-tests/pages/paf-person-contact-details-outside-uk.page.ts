import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonContactDetailsOutsideUkPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's contact details (if known) – GOV.UK"
      : "What is the person's contact details (if known) – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerPersonContactDetailsOutsideUk() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personContactDetailsOutsideUkAnswer(c);
  }
  
  async personContactDetailsOutsideUkAnswer(data: Record<string, string>) {
    await this.fillIfPresent('report-person-location-outside-uk-mobile', data.TELEPHONE);
    await this.fillIfPresent('report-person-location-outside-uk-phone', data.TELEPHONE);
    await this.fillIfPresent('report-person-location-outside-uk-email', data.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
