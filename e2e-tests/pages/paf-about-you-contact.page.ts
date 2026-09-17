import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouContactPage extends basePage {
  readonly expectedPageTitle = 'Can we contact you if required, to discuss the information you have provided?';
  readonly pageHeading = this.headerText;
  async aboutYouYesAnswer() { await this.selectByLabel('Yes'); await this.fillIfPresent('contact-number', c.TELEPHONE); await this.fillIfPresent('when-to-contact', c.TEXT); await this.clickContinueButton(); }
  async aboutYouNoAnswer() { await this.aboutYouYesAnswer(); }
}


