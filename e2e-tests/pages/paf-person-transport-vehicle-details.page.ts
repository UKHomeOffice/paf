import { basePage } from './base-page';

export class pafPersonTransportVehicleDetailsPage extends basePage {
  readonly expectedPageTitle = "What are the vehicle's details?";
  readonly pageHeading = this.headerText;
  async personVehicleDetailsAnswer() { await this.completeTextPage(['report-person-transport-vehicle-make', 'report-person-transport-vehicle-model', 'report-person-transport-vehicle-colour', 'report-person-transport-vehicle-registration', 'report-person-transport-vehicle-anything-else']); }
}


