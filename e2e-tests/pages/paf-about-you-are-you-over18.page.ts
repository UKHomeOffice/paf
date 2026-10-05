import { basePage } from './base-page';

export class pafAboutYouAreYouOver18Page extends basePage {
  readonly expectedPageTitle = 'Are you over 18?';
  readonly pageHeading = this.headerText;

  async answerAboutYouOver18(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    if (value.trim().toLowerCase() === 'yes') {
      await this.aboutYouOver18YesAnswer();
    } else {
      await this.aboutYouOver18NoAnswer();
    }
  }

  async aboutYouOver18YesAnswer() {
    await this.answerYesNoUnknown('Yes');
  }
  async aboutYouOver18NoAnswer() {
    await this.answerYesNoUnknown('No');
  }
}
