import { basePage } from './base-page';

export class pafAboutYouPage extends basePage {
  readonly expectedPageTitle = 'About You';
  readonly pageHeading = this.headerText;
  readonly howDidYouFindOutAboutTheCrime = this.page.locator('#how-did-you-find-out-about-the-crime');

  async aboutYouAnswer(data: Record<string, string>) {
    await this.howDidYouFindOutAboutTheCrime.fill(data.TEXT);
    await this.clickContinueButton();
  }
}
