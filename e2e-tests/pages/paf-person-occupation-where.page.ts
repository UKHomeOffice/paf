import { basePage } from './base-page';

export class pafPersonOccupationWherePage extends basePage {
  readonly expectedPageTitle = 'Do you know where the person works?';
  readonly pageHeading = this.headerText;

  async answerWorkLocationKnown(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.answerYesNoUnknown(value);
  }
}
