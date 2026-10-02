import { basePage } from './base-page';

export class pafPersonTransportVehicleTypePage extends basePage {
  readonly expectedPageTitle = 'What is the vehicle type?';
  readonly pageHeading = this.headerText;

  async answerPersonVehicleType(vehicleType: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    const parentLabel = this.vehicleParentLabel(vehicleType);

    if (parentLabel) {
      await this.selectByLabel(parentLabel);
    }

    await this.selectAndContinue(vehicleType);
  }

  private vehicleParentLabel(vehicleType: string) {
    if (['Car transporter'].includes(vehicleType)) return 'Car';
    if (['HGV canvas sided', 'HGV flatbed', 'HGV hard sided', 'HGV refrigerated', 'HGV tanker'].includes(vehicleType)) return 'HGV';
    if (['Lorry and drag'].includes(vehicleType)) return 'Lorry';
    if (['Van and trailer', 'Van (other)', '7.5 tonne van'].includes(vehicleType)) return 'Van';
    return '';
  }
}
