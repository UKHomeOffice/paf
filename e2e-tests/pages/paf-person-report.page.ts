import { basePage } from './base-page';

export class pafPersonReportPage extends basePage {
  readonly expectedPageTitle = 'The Person';
  readonly pageHeading = this.headerText;

  async answerReportIndividual(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.answerYesNoUnknown(value);
  }
}
