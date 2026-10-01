import { basePage } from './base-page';

export class pafCrimeTransportTrainDetailsPage extends basePage {
  readonly expectedPageTitle = 'What are the train details?';
  readonly pageHeading = this.headerText;
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
