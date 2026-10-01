import { basePage } from './base-page';

export class pafCrimeTransportVehicleDetailsPage extends basePage {
  readonly expectedPageTitle = 'What are the vehicle details?';
  readonly pageHeading = this.headerText;
  async crimeVehicleDetailsAnswer(data: Record<string, string>) {
    await this.completeTextPage(['vehicle-model', 'vehicle-make', 'vehicle-colour', 'vehicle-registration'], data.TEXT);
  }
}
