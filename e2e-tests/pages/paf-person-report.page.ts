import { basePage } from './base-page';

export class pafPersonReportPage extends basePage {
  readonly expectedPageTitle = 'The Person';
  readonly pageHeading = this.headerText;
  async personReportYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async personReportNoAnswer() { await this.answerYesNoUnknown('No'); }
  async personReportIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


