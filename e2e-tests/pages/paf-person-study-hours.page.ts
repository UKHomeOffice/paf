import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyHoursPage extends basePage {
  readonly expectedPageTitle = 'What hours of the day does the person study?';
  readonly pageHeading = this.headerText;

  async answerStudyHours() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personOccupationHoursAnswer(c);
  }
  
  async personOccupationHoursAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-study-hours'], data.TEXT);
  }
}
