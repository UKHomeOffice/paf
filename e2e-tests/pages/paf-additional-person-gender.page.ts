import { basePage } from './base-page';

export class pafAdditionalPersonGenderPage extends basePage {
  readonly expectedPageTitle = "What is the person's gender?";
  readonly pageHeading = this.headerText;

  async answerAdditionalPersonGender(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.selectAndContinue(value);
  }
}
