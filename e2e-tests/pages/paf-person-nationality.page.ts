import { basePage } from './base-page';

export class pafPersonNationalityPage extends basePage {
  readonly expectedPageTitle = "What is the person's nationality?";
  readonly pageHeading = this.headerText;
  async personReportNationalityAnswer() { await this.autocompleteById('report-person-nationality', 'Spain'); await this.clickContinueButton(); }
}


