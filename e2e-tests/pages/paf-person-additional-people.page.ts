import { basePage } from './base-page';

export class pafPersonAdditionalPeoplePage extends basePage {
  readonly expectedPageTitle = 'Do you want to tell us about another person who is involved in the same crime?';
  readonly pageHeading = this.headerText;

  async answerAnotherPersonInvolved(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.answerYesNoUnknown(value);
  }
}
