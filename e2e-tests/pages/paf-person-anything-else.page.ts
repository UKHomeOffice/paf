import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonAnythingElsePage extends basePage {
  readonly expectedPageTitle =
    'Please tell us anything else about the person you are reporting that you think we should know';
  readonly pageHeading = this.headerText;

  async answerAdditionalPersonInformation() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personAnythingElseAnswer(c);
  }

  async personAnythingElseAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-anything-else'], data.TEXT);
  }
}
