import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationDaysPage extends basePage {
  readonly expectedPageTitle = 'What days does the person work?';
  readonly pageHeading = this.headerText;

  async answerWorkDays() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personOccupationDaysAnswer(c);
  }
  
  async personOccupationDaysAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-occupation-days'], data.TEXT);
  }
}
