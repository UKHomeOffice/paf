import { basePage } from './base-page';

export class pafCrimeDeliveryPage extends basePage {
  readonly expectedPageTitle = 'Tell us which of the following the crime involves';
  readonly pageHeading = this.headerText;

  async answerDeliveryInvolvement(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.selectAndContinue(value);
  }
}
