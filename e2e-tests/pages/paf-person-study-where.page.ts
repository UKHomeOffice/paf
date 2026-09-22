import { basePage } from './base-page';

export class pafPersonStudyWherePage extends basePage {
  readonly expectedPageTitle = 'Do you know where in the UK the person studies?';
  readonly pageHeading = this.headerText;
  async personStudyWhereYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async personStudyWhereNoAnswer() { await this.answerYesNoUnknown('No'); }
  async personStudyWhereIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


