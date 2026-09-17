import { basePage } from './base-page';

export class pafCrimeTransportPage extends basePage {
  readonly expectedPageTitle = 'Does the crime involve any vehicles, transport or travel?';
  readonly pageHeading = this.headerText;
  async crimeTransportVehicleAnswer() { await this.selectByLabel('Vehicle'); }
  async crimeTransportBoatAnswer() { await this.selectByLabel('Boat'); }
  async crimeTransportTrainAnswer() { await this.selectByLabel('Train'); }
  async crimeTransportAeroplaneAnswer() { await this.selectByLabel('Aeroplane'); }
  async crimeTransportIdontKnowAnswer() { await this.selectAndContinue("I don't know"); }
  async crimeTransportNoAnswer() { await this.selectAndContinue('No'); }
}


