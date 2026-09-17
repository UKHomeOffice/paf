import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeTransportTrainDetailsPage extends basePage {
  readonly expectedPageTitle = 'What are the train details?';
  readonly pageHeading = this.headerText;
  async crimeTrainCompanyAnswer() { await this.autocompleteById('train-company', 'Eurostar'); }
  async crimeTrainCountryDepartureAnswer() { await this.autocompleteById('train-country-departure', c.COUNTRY); }
  async crimeStationDepartureAnswer() { await this.fillIfPresent('station-departure', c.TEXT); }
  async crimeStationArrivalAnswer() { await this.fillIfPresent('station-arrival', c.TEXT); }
  async crimeStationDepartureTimeAnswer() { await this.fillIfPresent('station-departure-time', '12:00'); }
  async crimeStationArrivalTimeAnswer() { await this.fillIfPresent('station-arrival-time', '13:00'); }
}


