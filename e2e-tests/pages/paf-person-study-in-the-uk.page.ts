import { basePage } from './base-page';

export class pafPersonStudyInTheUkPage extends basePage {
  readonly expectedPageTitle = 'Does the person study in the UK?';
  readonly pageHeading = this.headerText;

  async answerStudyInUk(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.answerYesNoUnknown(value);
  }
}
