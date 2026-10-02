import { basePage } from './base-page';

export class pafOrganisationPage extends basePage {
  readonly expectedPageTitle = 'The Organisation';
  readonly pageHeading = this.headerText;

  async answerReportOrganisation(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.answerYesNoUnknown(value);
  }
}
