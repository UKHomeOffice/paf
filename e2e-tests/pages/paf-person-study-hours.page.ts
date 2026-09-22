import { basePage } from './base-page';

export class pafPersonStudyHoursPage extends basePage {
  readonly expectedPageTitle = 'What hours of the day does the person study?';
  readonly pageHeading = this.headerText;
  async personOccupationHoursAnswer() { await this.completeTextPage(['report-person-study-hours']); }
}


