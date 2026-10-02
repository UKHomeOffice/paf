import { basePage } from './base-page';

export class pafCrimeTransportBoatTypePage extends basePage {
  readonly expectedPageTitle = 'What is the boat type?';
  readonly pageHeading = this.headerText;

  async answerBoatType(boatType: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.selectAndContinue(boatType.replace(' (Boat)', ''));
  }
}
