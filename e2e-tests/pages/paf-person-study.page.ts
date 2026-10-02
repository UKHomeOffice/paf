import { basePage } from './base-page';

export class pafPersonStudyPage extends basePage {
  readonly expectedPageTitle = 'Does the person study?';
  readonly pageHeading = this.headerText;

  async answerStudyStatus(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.answerYesNoUnknown(value);
  }
}
