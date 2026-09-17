import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouDobPage extends basePage {
  readonly expectedPageTitle = 'What is your date of birth?';
  readonly pageHeading = this.headerText;
  async aboutYouDobAnswer() { await this.fillDateByPrefix('about-you-dob', c.DOB); await this.clickContinueButton(); }
}


