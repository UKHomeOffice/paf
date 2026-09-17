import { basePage } from './base-page';

export class pafCrimeWhenWillCrimeHappenPage extends basePage {
  readonly expectedPageTitle = 'When will the crime happen?';
  readonly pageHeading = this.headerText;
  async answerCrimeHappenNext24Hours() { await this.selectAndContinue('In the next 24 hours'); }
  async answerCrimeHappenDateMoreThan24Hours() { await this.selectAndContinue('Date more than 24 hours in the future'); }
  async answerCrimeHappenIdontKnow() { await this.selectAndContinue("I don't know"); }
}


