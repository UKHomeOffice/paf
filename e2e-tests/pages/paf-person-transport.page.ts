import { basePage } from './base-page';

export class pafPersonTransportPage extends basePage {
  readonly expectedPageTitle = 'Does the person own a car or other vehicle?';
  readonly pageHeading = this.headerText;
  async personTransportYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async personTransportNoAnswer() { await this.answerYesNoUnknown('No'); }
  async personTransportIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


