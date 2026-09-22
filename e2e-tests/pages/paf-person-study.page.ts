import { basePage } from './base-page';

export class pafPersonStudyPage extends basePage {
  readonly expectedPageTitle = 'Does the person study?';
  readonly pageHeading = this.headerText;
  async personStudyYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async personStudyNoAnswer() { await this.answerYesNoUnknown('No'); }
  async personStudyIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


