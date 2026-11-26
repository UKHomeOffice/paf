import { basePage } from './base-page';

export class pafPersonReportPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: The Person – GOV.UK"
      : "The Person – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerReportIndividual(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(value);
  }
}
