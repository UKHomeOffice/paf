import { basePage } from './base-page';

export class pafAdditionalPersonNationalityPage extends basePage {
  readonly expectedPageTitle = "What is the person's nationality?";
  readonly pageHeading = this.headerText;
  async additionalPersonReportNationalityAnswer(data: Record<string, string>) {
    await this.autocompleteById('personAddNationality', data.NATIONALITY);
    await this.clickContinueButton();
  }
}
