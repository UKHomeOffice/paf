import { basePage } from './base-page';

export class pafPersonTransportVehicleTypePage extends basePage {
  readonly expectedPageTitle = 'What is the vehicle type?';
  readonly pageHeading = this.headerText;
  async personTransportBoatAnswer() { await this.selectAndContinue('Boat'); }
  async personTransportBulkCarrierCarAnswer() { await this.selectAndContinue('Bulk carrier'); }
  async personTransportCarAnswer() { await this.selectAndContinue('Car'); }
  async personTransportCarTransporterAnswer() { await this.selectAndContinue('Car transporter'); }
  async personTransportCaravanAnswer() { await this.selectAndContinue('Caravan'); }
  async personTransportCoachAnswer() { await this.selectAndContinue('Coach'); }
  async personTransportContainerAnswer() { await this.selectAndContinue('Container'); }
  async personTransportGlassCarrierAnswer() { await this.selectAndContinue('Glass carrier'); }
  async personTransportHgvCanvasSidedAnswer() { await this.selectAndContinue('HGV canvas sided'); }
  async personTransportHgvFlatbedAnswer() { await this.selectAndContinue('HGV flatbed'); }
  async personTransportHgvHardSidedAnswer() { await this.selectAndContinue('HGV hard sided'); }
  async personTransportHgvRefridgeratedAnswer() { await this.selectAndContinue('HGV refrigerated'); }
  async personTransportHgvTankerAnswer() { await this.selectAndContinue('HGV tanker'); }
  async personTransportLorryAnswer() { await this.selectAndContinue('Lorry'); }
  async personTransportLorryAndDragAnswer() { await this.selectAndContinue('Lorry and drag'); }
  async personTransportMinibusAnswer() { await this.selectAndContinue('Minibus'); }
  async personTransportMotorbikeAnswer() { await this.selectAndContinue('Motorbike'); }
  async personTransportMotorhomeAnswer() { await this.selectAndContinue('Motorhome'); }
  async personTransportUnaccompaniedTrailerAnswer() { await this.selectAndContinue('Unaccompanied trailer'); }
  async personTransportVanAnswer() { await this.selectAndContinue('Van'); }
  async personTransportVanAndTrailerAnswer() { await this.selectAndContinue('Van and trailer'); }
  async personTransportVanOtherAnswer() { await this.selectAndContinue('Van (other)'); }
  async personTransportVan75tonneAnswer() { await this.selectAndContinue('7.5 tonne van'); }
}


