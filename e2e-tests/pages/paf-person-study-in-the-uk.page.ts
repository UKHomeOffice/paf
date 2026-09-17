import { basePage } from './base-page';

export class pafPersonStudyInTheUkPage extends basePage {
  readonly expectedPageTitle = 'Does the person study in the UK?';
  readonly pageHeading = this.headerText;
  async personStudyInUkYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async personStudyInUkNoAnswer() { await this.answerYesNoUnknown('No'); }
  async personStudyInUkIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


