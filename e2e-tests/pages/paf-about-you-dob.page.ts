import { basePage } from './base-page';

export class pafAboutYouDobPage extends basePage {
  readonly expectedPageTitle = 'What is your date of birth?';
  readonly pageHeading = this.headerText;
  async aboutYouDobAnswer(data: Record<string, string>) {
    await this.fillDateByPrefix('about-you-dob', data.DOB);
    await this.clickContinueButton();
  }
}
