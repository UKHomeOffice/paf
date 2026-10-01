import { basePage } from './base-page';

export class pafAboutYouNationalityPage extends basePage {
  readonly expectedPageTitle = 'What is your nationality?';
  readonly pageHeading = this.headerText;
  async aboutYouNationalityAnswer(data: Record<string, string>) {
    await this.autocompleteById('about-you-nationality', data.NATIONALITY);
    await this.clickContinueButton();
  }
}
