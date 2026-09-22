import { basePage } from './base-page';

export class pafAboutYouHaveYouReportedBeforePage extends basePage {
  readonly expectedPageTitle = 'Have you reported the crime before?';
  readonly pageHeading = this.headerText;
  async aboutYouHaveYouEverReportedBeforeAnswer() { await this.completeTextPage(['have-you-reported-before']); }
}


