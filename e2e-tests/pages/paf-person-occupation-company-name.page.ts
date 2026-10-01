import { basePage } from './base-page';

export class pafPersonOccupationCompanyNamePage extends basePage {
  readonly expectedPageTitle = 'What is the name of the company the person works at?';
  readonly pageHeading = this.headerText;
  async personOccupationCompanyNameAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-occupation-company-name'], data.TEXT);
  }
}
