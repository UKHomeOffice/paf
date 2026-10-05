import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeTransportVehicleDetailsPage extends basePage {
  readonly expectedPageTitle = 'What are the vehicle details?';
  readonly pageHeading = this.headerText;

  async answerVehicleDetails() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.crimeVehicleDetailsAnswer(c);
  }

  async crimeVehicleDetailsAnswer(data: Record<string, string>) {
    await this.completeTextPage(['vehicle-model', 'vehicle-make', 'vehicle-colour', 'vehicle-registration'], data.TEXT);
  }
}
