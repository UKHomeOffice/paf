import { basePage } from './base-page';

export class pafAboutYouGenderPage extends basePage {
  readonly expectedPageTitle = 'What is your gender?';
  readonly pageHeading = this.headerText;
  async aboutYouGenderMaleAnswer() { await this.selectAndContinue('Male'); }
  async aboutYouGenderFemaleAnswer() { await this.selectAndContinue('Female'); }
  async aboutYouOtherAnswer() { await this.selectAndContinue('Other'); }
  async aboutYouPreferNotToSayAnswer() { await this.selectAndContinue('Prefer not to say'); }
}


