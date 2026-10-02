import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonTransportVehicleDetailsPage extends basePage {
  readonly expectedPageTitle = "What are the vehicle's details?";
  readonly pageHeading = this.headerText;

  async answerPersonVehicleDetails() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personVehicleDetailsAnswer(c);
  }


  async personVehicleDetailsAnswer(data: Record<string, string>) {
    await this.completeTextPage(
      [
        'report-person-transport-vehicle-make',
        'report-person-transport-vehicle-model',
        'report-person-transport-vehicle-colour',
        'report-person-transport-vehicle-registration',
        'report-person-transport-vehicle-anything-else'
      ],
      data.TEXT
    );
  }
}
