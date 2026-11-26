import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeTransportVehicleDetailsPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What are the vehicle details? – GOV.UK"
      : "What are the vehicle details? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerVehicleDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.crimeVehicleDetailsAnswer(c);
  }

  async crimeVehicleDetailsAnswer(data: Record<string, string>) {
    await this.completeTextPage(['vehicle-model', 'vehicle-make', 'vehicle-colour', 'vehicle-registration'], data.TEXT);
  }
}
