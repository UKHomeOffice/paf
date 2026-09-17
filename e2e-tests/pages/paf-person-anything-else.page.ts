import { basePage } from './base-page';

export class pafPersonAnythingElsePage extends basePage {
  readonly expectedPageTitle = 'Please tell us anything else about the person you are reporting that you think we should know';
  readonly pageHeading = this.headerText;
  async personAnythingElseAnswer() { await this.completeTextPage(['report-person-anything-else']); }
}


