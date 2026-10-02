import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouDoesAnyoneElseKnowPage extends basePage {
  readonly expectedPageTitle = 'Does anyone else know about the crime?';
  readonly pageHeading = this.headerText;

  async answerDoesAnyoneElseKnow() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.aboutYouDoesAnyoneElseKnowAnswer(c);
  }

  async aboutYouDoesAnyoneElseKnowAnswer(data: Record<string, string>) {
    await this.completeTextPage(['does-anyone-else-know'], data.TEXT);
  }
}
