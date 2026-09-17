import { basePage } from './base-page';

export class pafPersonOccupationWherePage extends basePage {
  readonly expectedPageTitle = 'Do you know where the person works?';
  readonly pageHeading = this.headerText;
  async personOccupationWhereYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async personOccupationWhereNoAnswer() { await this.answerYesNoUnknown('No'); }
  async personOccupationWhereIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


