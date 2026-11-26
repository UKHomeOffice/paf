import { basePage } from './base-page';

export class pafPersonOccupationPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Do you know if the person has a job? – GOV.UK"
      : "Do you know if the person has a job? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerJobStatus(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(value);
  }
}
