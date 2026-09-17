import { basePage } from './base-page';

export class pafPersonOccupationDaysPage extends basePage {
  readonly expectedPageTitle = 'What days does the person work?';
  readonly pageHeading = this.headerText;
  async personOccupationDaysAnswer() { await this.completeTextPage(['report-person-occupation-days']); }
}


