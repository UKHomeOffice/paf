import { basePage } from './base-page';

export class pafAboutYouAreYouOver18Page extends basePage {
  readonly expectedPageTitle = 'Are you over 18?';
  readonly pageHeading = this.headerText;
  async aboutYouOver18YesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async aboutYouOver18NoAnswer() { await this.answerYesNoUnknown('No'); }
}


