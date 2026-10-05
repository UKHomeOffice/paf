import { basePage } from './base-page';

export class pafPersonTransportPage extends basePage {
  readonly expectedPageTitle = 'Does the person own a car or other vehicle?';
  readonly pageHeading = this.headerText;

  async answerPersonOwnsVehicle(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.answerYesNoUnknown(value);
  }
}
