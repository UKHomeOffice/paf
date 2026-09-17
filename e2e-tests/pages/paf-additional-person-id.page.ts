import { basePage } from './base-page';

export class pafAdditionalPersonIdPage extends basePage {
  readonly expectedPageTitle = "What are the person's forms of identification?";
  readonly pageHeading = this.headerText;
  async additionalPersonReportIdAnswer() { await this.completeTextPage(['personAddPassport', 'personAddId', 'personAddNi']); }
}


