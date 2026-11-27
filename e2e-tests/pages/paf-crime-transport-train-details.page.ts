import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeTransportTrainDetailsPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What are the train details? – GOV.UK"
      : "What are the train details? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerTrainDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.autocompleteById('train-company', c.TRAIN_COMPANY);
    await this.autocompleteById('train-country-departure', c.COUNTRY);
    await this.fillIfPresent('station-departure', c.TEXT);
    await this.fillIfPresent('station-arrival', c.TEXT);
    await this.fillIfPresent('station-departure-time', c.DEPARTURE_TIME);
    await this.fillIfPresent('station-arrival-time', c.ARRIVAL_TIME);
    await this.clickContinueButton();
  }
}
