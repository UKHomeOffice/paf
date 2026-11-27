import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouDetailsPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Please provide your details. – GOV.UK"
      : "Please provide your details. – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAboutYouDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillIfPresent('about-you-first-name', c.FIRST_NAME);
    await this.fillIfPresent('about-you-family-name', c.LAST_NAME);
    await this.clickContinueButton();
  }
}
