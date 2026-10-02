import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouNationalityPage extends basePage {
  readonly expectedPageTitle = 'What is your nationality?';
  readonly pageHeading = this.headerText;

  async answerAboutYouNationality() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.aboutYouNationalityAnswer(c);
  }

  async aboutYouNationalityAnswer(data: Record<string, string>) {
    await this.autocompleteById('about-you-nationality', data.NATIONALITY);
    await this.clickContinueButton();
  }
}
