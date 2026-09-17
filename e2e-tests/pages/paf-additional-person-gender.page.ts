import { basePage } from './base-page';

export class pafAdditionalPersonGenderPage extends basePage {
  readonly expectedPageTitle = "What is the person's gender?";
  readonly pageHeading = this.headerText;
  async additionalPersonReportGenderMaleAnswer() { await this.selectAndContinue('Male'); }
  async additionalPersonReportGenderFemaleAnswer() { await this.selectAndContinue('Female'); }
  async additionalPersonReportGenderOtherAnswer() { await this.selectAndContinue('Other'); }
  async additionalPersonReportGenderIdontKnowAnswer() { await this.selectAndContinue("I don't know"); }
}


