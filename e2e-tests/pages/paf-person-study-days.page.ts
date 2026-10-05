import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyDaysPage extends basePage {
  readonly expectedPageTitle = 'What days does the person study?';
  readonly pageHeading = this.headerText;

  async answerStudyDays() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personOccupationDaysAnswer(c);
  }
  
  async personOccupationDaysAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-study-days'], data.TEXT);
  }
}
