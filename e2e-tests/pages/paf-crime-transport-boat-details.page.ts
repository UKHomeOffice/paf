import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeTransportBoatDetailsPage extends basePage {
  readonly expectedPageTitle = 'What are the boat details?';
  readonly pageHeading = this.headerText;

  async answerBoatDetails() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.crimeBoatNameAnswer(c);
    await this.crimeBoatCountryDepartureAnswer(c);
    await this.crimePortDepartureAnswer(c);
    await this.crimePortArrivalAnswer(c);
    await this.crimePortDepartureTimeAnswer(c);
    await this.crimePortArrivalTimeAnswer(c);
    await this.clickContinueButton();
  }

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
