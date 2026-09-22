import { basePage } from './base-page';

export class pafAboutYouPage extends basePage {
  readonly expectedPageTitle = 'About You';
  readonly pageHeading = this.headerText;
  readonly howDidYouFindOutAboutTheCrime = this.page.locator('#how-did-you-find-out-about-the-crime');

  async aboutYouAnswer() {
    await this.howDidYouFindOutAboutTheCrime.fill('Text');
    await this.clickContinueButton();
  }
}
