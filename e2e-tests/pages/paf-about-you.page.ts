import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouPage extends basePage {
  readonly expectedPageTitle = 'About You';
  readonly pageHeading = this.headerText;
  readonly howDidYouFindOutAboutTheCrime = this.page.locator('#how-did-you-find-out-about-the-crime');

  async answerHowDidYouFindOutAboutTheCrime() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.aboutYouAnswer(c);
  }

  async aboutYouAnswer(data: Record<string, string>) {
    await this.howDidYouFindOutAboutTheCrime.fill(data.TEXT);
    await this.clickContinueButton();
  }
}
