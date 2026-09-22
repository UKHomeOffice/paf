import { basePage } from './base-page';

export class pafPersonOccupationCompanyNamePage extends basePage {
  readonly expectedPageTitle = 'What is the name of the company the person works at?';
  readonly pageHeading = this.headerText;
  async personOccupationCompanyNameAnswer() { await this.completeTextPage(['report-person-occupation-company-name']); }
}


