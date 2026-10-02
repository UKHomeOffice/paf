import { basePage } from './base-page';

export class pafPersonGenderPage extends basePage {
  readonly expectedPageTitle = "What is the person's gender?";
  readonly pageHeading = this.headerText;

  async answerPersonGender(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.selectAndContinue(value);
  }
}
