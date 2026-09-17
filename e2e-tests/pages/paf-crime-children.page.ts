import { basePage } from './base-page';

export class pafCrimeChildrenPage extends basePage {
  readonly expectedPageTitle = 'Are there children involved?';
  readonly pageHeading = this.headerText;
  async childrenInvolvedYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async childrenInvolvedNoAnswer() { await this.answerYesNoUnknown('No'); }
  async childrenInvolvedIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


