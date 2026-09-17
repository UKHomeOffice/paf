import { basePage } from './base-page';

export class pafOtherInformationAnotherCrimePage extends basePage {
  readonly expectedPageTitle = 'Do you want to report another crime by the same person or business?';
  readonly pageHeading = this.headerText;
  async otherInformationAnotherCrimeYesAnswer() { await this.selectByLabel('Yes'); await this.fillIfPresent('other-info-another-crime-description', 'Text'); await this.clickContinueButton(); }
  async otherInformationAnotherCrimeNoAnswer() { await this.answerYesNoUnknown('No'); }
}


