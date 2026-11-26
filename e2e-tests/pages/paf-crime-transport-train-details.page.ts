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
    await this.crimeTrainCompanyAnswer(c);
    await this.crimeTrainCountryDepartureAnswer(c);
    await this.crimeStationDepartureAnswer(c);
    await this.crimeStationArrivalAnswer(c);
    await this.crimeStationDepartureTimeAnswer(c);
    await this.crimeStationArrivalTimeAnswer(c);
    await this.clickContinueButton();
  }

  async crimeTrainCompanyAnswer(data: Record<string, string>) {
    await this.autocompleteById('train-company', data.TRAIN_COMPANY);
  }
  async crimeTrainCountryDepartureAnswer(data: Record<string, string>) {
    await this.autocompleteById('train-country-departure', data.COUNTRY);
  }
  async crimeStationDepartureAnswer(data: Record<string, string>) {
    await this.fillIfPresent('station-departure', data.TEXT);
  }
  async crimeStationArrivalAnswer(data: Record<string, string>) {
    await this.fillIfPresent('station-arrival', data.TEXT);
  }
  async crimeStationDepartureTimeAnswer(data: Record<string, string>) {
    await this.fillIfPresent('station-departure-time', data.DEPARTURE_TIME);
  }
  async crimeStationArrivalTimeAnswer(data: Record<string, string>) {
    await this.fillIfPresent('station-arrival-time', data.ARRIVAL_TIME);
  }
}
