import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouDobPage extends basePage {
  readonly expectedPageTitle = 'What is your date of birth?';
  readonly pageHeading = this.headerText;

  async answerAboutYouDateOfBirth() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.aboutYouDobAnswer(c);
  }

  async aboutYouDobAnswer(data: Record<string, string>) {
    await this.fillDateByPrefix('about-you-dob', data.DOB);
    await this.clickContinueButton();
  }
}
