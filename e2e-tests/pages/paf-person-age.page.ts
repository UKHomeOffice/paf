import { basePage } from './base-page';

export class pafPersonAgePage extends basePage {
  readonly expectedPageTitle = "What is the person's approximate age?";
  readonly pageHeading = this.headerText;

  async answerPersonAge(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.selectAndContinue(value);
  }
}
