import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeTransportBoatDetailsPage extends basePage {
  readonly expectedPageTitle = 'What are the boat details?';
  readonly pageHeading = this.headerText;
  async crimeBoatNameAnswer() { await this.fillIfPresent('boat-name', c.TEXT); }
  async crimeBoatCountryDepartureAnswer() { await this.autocompleteById('boat-country-departure', c.COUNTRY); }
  async crimePortDepartureAnswer() { await this.fillIfPresent('port-departure', c.TEXT); }
  async crimePortArrivalAnswer() { await this.fillIfPresent('port-arrival', c.TEXT); }
  async crimePortDepartureTimeAnswer() { await this.fillIfPresent('port-departure-time', '12:00'); }
  async crimePortArrivalTimeAnswer() { await this.fillIfPresent('port-arrival-time', '13:00'); }
}


