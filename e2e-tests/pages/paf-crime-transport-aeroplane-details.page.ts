import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeTransportAeroplaneDetailsPage extends basePage {
  readonly expectedPageTitle = 'What are the aeroplane details?';
  readonly pageHeading = this.headerText;
  async crimeAirlineCompanyAnswer() { await this.autocompleteById('airline-company', 'British Airways'); }
  async crimeAirlineFlightNumberAnswer() { await this.fillIfPresent('airline-flight-number', 'BA123'); }
  async crimeAirlineCountryDepartureAnswer() { await this.autocompleteById('airline-country-departure', c.COUNTRY); }
  async crimeAirportDepartureAnswer() { await this.fillIfPresent('airport-departure', c.TEXT); }
  async crimeAirportArrivalAnswer() { await this.fillIfPresent('airport-arrival', c.TEXT); }
  async crimeAirportDepartureTimeAnswer() { await this.fillIfPresent('airport-departure-time', '12:00'); }
  async crimeAirportArrivalTimeAnswer() { await this.fillIfPresent('airport-arrival-time', '13:00'); }
}


