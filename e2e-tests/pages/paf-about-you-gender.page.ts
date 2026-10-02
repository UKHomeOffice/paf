import { basePage } from './base-page';

export class pafAboutYouGenderPage extends basePage {
  readonly expectedPageTitle = 'What is your gender?';
  readonly pageHeading = this.headerText;

  async answerAboutYouGender(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.selectAndContinue(value);
  }
}
