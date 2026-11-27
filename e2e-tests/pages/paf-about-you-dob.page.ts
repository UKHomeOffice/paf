import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouDobPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is your date of birth? – GOV.UK"
      : "What is your date of birth? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAboutYouDateOfBirth() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillDateByPrefix('about-you-dob', c.DOB);
    await this.clickContinueButton();
  }
}
