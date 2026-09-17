import { basePage } from './base-page';

export class pafAboutYouNationalityPage extends basePage {
  readonly expectedPageTitle = 'What is your nationality?';
  readonly pageHeading = this.headerText;
  async aboutYouNationalityAnswer() { await this.autocompleteById('about-you-nationality', 'Spain'); await this.clickContinueButton(); }
}


