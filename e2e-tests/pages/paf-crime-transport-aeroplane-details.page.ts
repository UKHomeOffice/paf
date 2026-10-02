import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeTransportAeroplaneDetailsPage extends basePage {
  readonly expectedPageTitle = 'What are the aeroplane details?';
  readonly pageHeading = this.headerText;

  async answerAeroplaneDetails() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.crimeAirlineCompanyAnswer(c);
    await this.crimeAirlineFlightNumberAnswer(c);
    await this.crimeAirlineCountryDepartureAnswer(c);
    await this.crimeAirportDepartureAnswer(c);
    await this.crimeAirportArrivalAnswer(c);
    await this.crimeAirportDepartureTimeAnswer(c);
    await this.crimeAirportArrivalTimeAnswer(c);
    await this.clickContinueButton();
  }

  async crimeAirlineCompanyAnswer(data: Record<string, string>) {
    await this.autocompleteById('airline-company', data.AIRLINE);
  }
  async crimeAirlineFlightNumberAnswer(data: Record<string, string>) {
    await this.fillIfPresent('airline-flight-number', data.FLIGHT_NUMBER);
  }
  async crimeAirlineCountryDepartureAnswer(data: Record<string, string>) {
    await this.autocompleteById('airline-country-departure', data.COUNTRY);
  }
  async crimeAirportDepartureAnswer(data: Record<string, string>) {
    await this.fillIfPresent('airport-departure', data.TEXT);
  }
  async crimeAirportArrivalAnswer(data: Record<string, string>) {
    await this.fillIfPresent('airport-arrival', data.TEXT);
  }
  async crimeAirportDepartureTimeAnswer(data: Record<string, string>) {
    await this.fillIfPresent('airport-departure-time', data.DEPARTURE_TIME);
  }
  async crimeAirportArrivalTimeAnswer(data: Record<string, string>) {
    await this.fillIfPresent('airport-arrival-time', data.ARRIVAL_TIME);
  }
}
