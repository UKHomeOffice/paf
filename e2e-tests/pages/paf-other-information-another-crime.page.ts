import { basePage } from './base-page';

export class pafOtherInformationAnotherCrimePage extends basePage {
  readonly expectedPageTitle = 'Do you want to report another crime by the same person or business?';
  readonly pageHeading = this.headerText;
  async otherInformationAnotherCrimeYesAnswer(data: Record<string, string>) {
    await this.selectByLabel('Yes');
    await this.fillIfPresent('other-info-another-crime-description', data.TEXT);
    await this.clickContinueButton();
  }
  async otherInformationAnotherCrimeNoAnswer() {
    await this.answerYesNoUnknown('No');
  }
}
