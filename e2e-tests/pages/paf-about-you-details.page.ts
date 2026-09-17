import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouDetailsPage extends basePage {
  readonly expectedPageTitle = 'Please provide your details';
  readonly pageHeading = this.headerText;
  async aboutYouDetailsAnswer() { await this.fillIfPresent('about-you-first-name', c.FIRST_NAME); await this.fillIfPresent('about-you-family-name', c.LAST_NAME); await this.clickContinueButton(); }
}


