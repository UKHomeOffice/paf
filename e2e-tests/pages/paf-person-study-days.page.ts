import { basePage } from './base-page';

export class pafPersonStudyDaysPage extends basePage {
  readonly expectedPageTitle = 'What days does the person study?';
  readonly pageHeading = this.headerText;
  async personOccupationDaysAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-study-days'], data.TEXT);
  }
}
