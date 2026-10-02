import { basePage } from './base-page';

export class pafPersonOccupationPage extends basePage {
  readonly expectedPageTitle = 'Do you know if the person has a job?';
  readonly pageHeading = this.headerText;

  async answerJobStatus(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.answerYesNoUnknown(value);
  }
}
