import { basePage } from './base-page';

export class pafPersonNationalityPage extends basePage {
  readonly expectedPageTitle = "What is the person's nationality?";
  readonly pageHeading = this.headerText;
  async personReportNationalityAnswer(data: Record<string, string>) {
    await this.autocompleteById('report-person-nationality', data.NATIONALITY);
    await this.clickContinueButton();
  }
}
