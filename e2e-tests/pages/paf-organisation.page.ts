import { basePage } from './base-page';

export class pafOrganisationPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: The Organisation – GOV.UK"
      : "The Organisation – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerReportOrganisation(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(value);
  }
}
