import { basePage } from './base-page';

export class pafCrimeTransportBoatTypePage extends basePage {
  readonly expectedPageTitle = 'What is the boat type?';
  readonly pageHeading = this.headerText;
  async crimeTransportBargeAnswer() { await this.selectAndContinue('Barge'); }
  async crimeTransportCabinCruiserAnswer() { await this.selectAndContinue('Cabin cruiser'); }
  async crimeTransportCablePipeLayerAnswer() { await this.selectAndContinue('Cable/pipe layer'); }
  async crimeTransportBulkCarrierBoatAnswer() { await this.selectAndContinue('Bulk carrier'); }
  async crimeTransportVehicleCarrierAnswer() { await this.selectAndContinue('Vehicle carrier'); }
  async crimeTransportVesselCarrierAnswer() { await this.selectAndContinue('Vessel carrier'); }
  async crimeTransportCatamaranMultihulledAnswer() { await this.selectAndContinue('Catamaran multihulled'); }
  async crimeTransportContainershipAnswer() { await this.selectAndContinue('Containership'); }
  async crimeTransportCruiseShipAnswer() { await this.selectAndContinue('Cruise ship'); }
  async crimeTransportDayboatAnswer() { await this.selectAndContinue('Dayboat'); }
  async crimeTransportDinghyAnswer() { await this.selectAndContinue('Dinghy'); }
  async crimeTransportFerryAnswer() { await this.selectAndContinue('Ferry'); }
  async crimeTransportFishingBoatAnswer() { await this.selectAndContinue('Fishing boat'); }
  async crimeTransportGeneralCargoAnswer() { await this.selectAndContinue('General cargo'); }
  async crimeTransportGeneralCargoWithContainerCapacityAnswer() { await this.selectAndContinue('General cargo with container capacity'); }
  async crimeTransportKetchAnswer() { await this.selectAndContinue('Ketch'); }
  async crimeTransportReeferAnswer() { await this.selectAndContinue('Reefer'); }
  async crimeTransportResearchVesselAnswer() { await this.selectAndContinue('Research vessel'); }
  async crimeTransportSupplyVesselAnswer() { await this.selectAndContinue('Supply vessel'); }
  async crimeTransportSupportVesselAnswer() { await this.selectAndContinue('Support vessel'); }
  async crimeTransportRhibAnswer() { await this.selectAndContinue('Rhib'); }
  async crimeTransportTankerAnswer() { await this.selectAndContinue('Tanker'); }
  async crimeTransportTugAnswer() { await this.selectAndContinue('Tug'); }
  async crimeTransportYachtAnswer() { await this.selectAndContinue('Yacht'); }
}


