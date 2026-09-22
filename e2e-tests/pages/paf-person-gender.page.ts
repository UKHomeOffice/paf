import { basePage } from './base-page';

export class pafPersonGenderPage extends basePage {
  readonly expectedPageTitle = "What is the person's gender?";
  readonly pageHeading = this.headerText;
  async personReportGenderMaleAnswer() { await this.selectAndContinue('Male'); }
  async personReportGenderFemaleAnswer() { await this.selectAndContinue('Female'); }
  async personReportGenderOtherAnswer() { await this.selectAndContinue('Other'); }
  async personReportGenderIdontKnowAnswer() { await this.selectAndContinue("I don't know"); }
}


