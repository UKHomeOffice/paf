import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationHoursPage extends basePage {
  readonly expectedPageTitle = 'What hours of the day does the person work?';
  readonly pageHeading = this.headerText;

  async answerWorkHours() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personOccupationHoursAnswer(c);
  }
  
  async personOccupationHoursAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-occupation-hours'], data.TEXT);
  }
}
