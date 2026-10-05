import { basePage } from './base-page';

export class pafCrimeWhenWillCrimeHappenPage extends basePage {
  readonly expectedPageTitle = 'When will the crime happen?';
  readonly pageHeading = this.headerText;

  async answerWhenCrimeWillHappen(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);

    switch (value) {
      case 'In the next 24 hours':
        return this.answerCrimeHappenNext24Hours();
      case 'Date more than 24 hours in the future':
        return this.answerCrimeHappenDateMoreThan24Hours();
      case "I don't know":
        return this.answerCrimeHappenIdontKnow();
      default:
        throw new Error(`Invalid when will crime happen: ${value}`);
    }
  }

  async answerCrimeHappenNext24Hours() {
    await this.selectAndContinue('In the next 24 hours');
  }
  async answerCrimeHappenDateMoreThan24Hours() {
    await this.selectAndContinue('Date more than 24 hours in the future');
  }
  async answerCrimeHappenIdontKnow() {
    await this.selectAndContinue("I don't know");
  }
}
