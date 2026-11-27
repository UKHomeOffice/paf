import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonTransportVehicleDetailsPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What are the vehicle's details? – GOV.UK"
      : "What are the vehicle's details? – GOV.UK";
  }

  async answerPersonVehicleDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(
      [
        'report-person-transport-vehicle-make',
        'report-person-transport-vehicle-model',
        'report-person-transport-vehicle-colour',
        'report-person-transport-vehicle-registration',
        'report-person-transport-vehicle-anything-else'
      ],
      c.TEXT
    );
  }
}
