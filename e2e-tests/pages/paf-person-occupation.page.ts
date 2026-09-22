import { basePage } from './base-page';

export class pafPersonOccupationPage extends basePage {
  readonly expectedPageTitle = 'Do you know if the person has a job?';
  readonly pageHeading = this.headerText;
  async personOccupationYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async personOccupationNoAnswer() { await this.answerYesNoUnknown('No'); }
  async personOccupationIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


