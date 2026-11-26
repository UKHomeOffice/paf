import { basePage } from './base-page';

export class pafCrimeTransportBoatTypePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the boat type? – GOV.UK"
      : "What is the boat type? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerBoatType(boatType: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.selectAndContinue(boatType.replace(' (Boat)', ''));
  }
}
