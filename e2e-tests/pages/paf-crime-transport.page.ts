import { basePage } from './base-page';

export class pafCrimeTransportPage extends basePage {
  readonly expectedPageTitle = 'Does the crime involve any vehicles, transport or travel?';
  readonly pageHeading = this.headerText;

  async answerTransportInvolvement(transport: string) {
    await this.assertPageTitle(this.expectedPageTitle);

    switch (transport) {
      case "I don't know":
        return this.crimeTransportIdontKnowAnswer();
      case 'No':
        return this.crimeTransportNoAnswer();
      case 'Vehicle':
        await this.selectByLabel('Yes');
        await this.crimeTransportVehicleAnswer();
        break;
      case 'Boat':
        await this.selectByLabel('Yes');
        await this.crimeTransportBoatAnswer();
        break;
      case 'Train':
        await this.selectByLabel('Yes');
        await this.crimeTransportTrainAnswer();
        break;
      case 'Aeroplane':
        await this.selectByLabel('Yes');
        await this.crimeTransportAeroplaneAnswer();
        break;
      case 'All':
        await this.selectByLabel('Yes');
        await this.crimeTransportVehicleAnswer();
        await this.crimeTransportBoatAnswer();
        await this.crimeTransportTrainAnswer();
        await this.crimeTransportAeroplaneAnswer();
        break;
      case 'Vehicle, Train':
        await this.selectByLabel('Yes');
        await this.crimeTransportVehicleAnswer();
        await this.crimeTransportTrainAnswer();
        break;
      case 'Boat, Train, Vehicle':
        await this.selectByLabel('Yes');
        await this.crimeTransportBoatAnswer();
        await this.crimeTransportTrainAnswer();
        await this.crimeTransportVehicleAnswer();
        break;
      default:
        throw new Error(`Invalid transport type: ${transport}`);
    }

    await this.clickContinueButton();
  }

  async crimeTransportVehicleAnswer() {
    await this.selectByLabel('Vehicle');
  }
  async crimeTransportBoatAnswer() {
    await this.selectByLabel('Boat');
  }
  async crimeTransportTrainAnswer() {
    await this.selectByLabel('Train');
  }
  async crimeTransportAeroplaneAnswer() {
    await this.selectByLabel('Aeroplane');
  }
  async crimeTransportIdontKnowAnswer() {
    await this.selectAndContinue("I don't know");
  }
  async crimeTransportNoAnswer() {
    await this.selectAndContinue('No');
  }
}
