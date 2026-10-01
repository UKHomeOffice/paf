import { basePage } from './base-page';

export class pafCrimeTransportBoatDetailsPage extends basePage {
  readonly expectedPageTitle = 'What are the boat details?';
  readonly pageHeading = this.headerText;
  async crimeBoatNameAnswer(data: Record<string, string>) {
    await this.fillIfPresent('boat-name', data.TEXT);
  }
  async crimeBoatCountryDepartureAnswer(data: Record<string, string>) {
    await this.autocompleteById('boat-country-departure', data.COUNTRY);
  }
  async crimePortDepartureAnswer(data: Record<string, string>) {
    await this.fillIfPresent('port-departure', data.TEXT);
  }
  async crimePortArrivalAnswer(data: Record<string, string>) {
    await this.fillIfPresent('port-arrival', data.TEXT);
  }
  async crimePortDepartureTimeAnswer(data: Record<string, string>) {
    await this.fillIfPresent('port-departure-time', data.DEPARTURE_TIME);
  }
  async crimePortArrivalTimeAnswer(data: Record<string, string>) {
    await this.fillIfPresent('port-arrival-time', data.ARRIVAL_TIME);
  }
}
