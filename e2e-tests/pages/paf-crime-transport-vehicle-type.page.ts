import { basePage } from './base-page';

export class pafCrimeTransportVehicleTypePage extends basePage {
  readonly expectedPageTitle = 'What is the vehicle type?';
  readonly pageHeading = this.headerText;
  async crimeTransportBulkCarrierCarAnswer() { await this.selectAndContinue('Bulk carrier'); }
  async crimeTransportCarAnswer() { await this.selectAndContinue('Car'); }
  async crimeTransportCarTransporterAnswer() { await this.selectAndContinue('Car transporter'); }
  async crimeTransportCaravanAnswer() { await this.selectAndContinue('Caravan'); }
  async crimeTransportCoachAnswer() { await this.selectAndContinue('Coach'); }
  async crimeTransportContainerAnswer() { await this.selectAndContinue('Container'); }
  async crimeTransportGlassCarrierAnswer() { await this.selectAndContinue('Glass carrier'); }
  async crimeTransportHgvCanvasSidedAnswer() { await this.selectAndContinue('HGV canvas sided'); }
  async crimeTransportHgvFlatbedAnswer() { await this.selectAndContinue('HGV flatbed'); }
  async crimeTransportHgvHardSidedAnswer() { await this.selectAndContinue('HGV hard sided'); }
  async crimeTransportHgvRefridgeratedAnswer() { await this.selectAndContinue('HGV refrigerated'); }
  async crimeTransportHgvTankerAnswer() { await this.selectAndContinue('HGV tanker'); }
  async crimeTransportLorryAnswer() { await this.selectAndContinue('Lorry'); }
  async crimeTransportLorryAndDragAnswer() { await this.selectAndContinue('Lorry and drag'); }
  async crimeTransportMinibusAnswer() { await this.selectAndContinue('Minibus'); }
  async crimeTransportMotorbikeAnswer() { await this.selectAndContinue('Motorbike'); }
  async crimeTransportMotorhomeAnswer() { await this.selectAndContinue('Motorhome'); }
  async crimeTransportUnaccompaniedTrailerAnswer() { await this.selectAndContinue('Unaccompanied trailer'); }
  async crimeTransportVanAnswer() { await this.selectAndContinue('Van'); }
  async crimeTransportVanAndTrailerAnswer() { await this.selectAndContinue('Van and trailer'); }
  async crimeTransportVanOtherAnswer() { await this.selectAndContinue('Van (other)'); }
  async crimeTransportVan75tonneAnswer() { await this.selectAndContinue('7.5 tonne van'); }
}


