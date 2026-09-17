import { basePage } from './base-page';

export class pafPersonOccupationHoursPage extends basePage {
  readonly expectedPageTitle = 'What hours of the day does the person work?';
  readonly pageHeading = this.headerText;
  async personOccupationHoursAnswer() { await this.completeTextPage(['report-person-occupation-hours']); }
}


