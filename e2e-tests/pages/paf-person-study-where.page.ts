import { basePage } from './base-page';

export class pafPersonStudyWherePage extends basePage {
  readonly expectedPageTitle = 'Do you know where in the UK the person studies?';
  readonly pageHeading = this.headerText;

  async answerStudyLocationKnown(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.answerYesNoUnknown(value);
  }
}
