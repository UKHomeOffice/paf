import { basePage } from './base-page';

export class pafAdditionalPersonNationalityPage extends basePage {
  readonly expectedPageTitle = "What is the person's nationality?";
  readonly pageHeading = this.headerText;
  async additionalPersonReportNationalityAnswer() { await this.autocompleteById('personAddNationality', 'Spain'); await this.clickContinueButton(); }
}


