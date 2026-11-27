import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouContactPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Can we contact you if required, to discuss the information you have provided? – GOV.UK"
      : "Can we contact you if required, to discuss the information you have provided? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAboutYouContactDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.selectByLabel('Yes');
    await this.fillIfPresent('contact-number', c.TELEPHONE);
    await this.fillIfPresent('when-to-contact', c.TEXT);
    await this.clickContinueButton();
  }
}
