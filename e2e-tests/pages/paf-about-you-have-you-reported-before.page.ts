import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouHaveYouReportedBeforePage extends basePage {
  readonly expectedPageTitle = 'Have you reported the crime before?';
  readonly pageHeading = this.headerText;

  async answerHaveYouReportedBefore() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.aboutYouHaveYouEverReportedBeforeAnswer(c);
  }
  async aboutYouHaveYouEverReportedBeforeAnswer(data: Record<string, string>) {
    await this.completeTextPage(['have-you-reported-before'], data.TEXT);
  }
}
