import { basePage } from './base-page';

export class pafPersonIdPage extends basePage {
  readonly expectedPageTitle = "What are the person's forms of identification?";
  readonly pageHeading = this.headerText;
  async personReportIdAnswer() { await this.completeTextPage(['report-person-passport', 'report-person-id', 'report-person-ni']); }
}


