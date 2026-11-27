import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: About You – GOV.UK"
      : "About You – GOV.UK";
  }
  readonly pageHeading = this.headerText;
  readonly howDidYouFindOutAboutTheCrime = this.page.locator('#how-did-you-find-out-about-the-crime');

  async answerHowDidYouFindOutAboutTheCrime() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.howDidYouFindOutAboutTheCrime.fill(c.TEXT);
    await this.clickContinueButton();
  }
}
