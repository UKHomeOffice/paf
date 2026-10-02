import { basePage } from './base-page';

export class pafCrimeChildrenPage extends basePage {
  readonly expectedPageTitle = 'Are there children involved?';
  readonly pageHeading = this.headerText;

  async answerChildrenInvolved(childrenInvolved: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.answerYesNoUnknown(childrenInvolved);
  }
}
