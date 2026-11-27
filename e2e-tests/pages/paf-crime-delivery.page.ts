import { basePage } from './base-page';

export class pafCrimeDeliveryPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Tell us which of the following the crime involves: – GOV.UK"
      : "Tell us which of the following the crime involves: – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerDeliveryInvolvement(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.selectAndContinue(value);
  }
}
