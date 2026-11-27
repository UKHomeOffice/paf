import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouHaveYouReportedBeforePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Have you reported the crime before? – GOV.UK"
      : "Have you reported the crime before? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerHaveYouReportedBefore() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(['have-you-reported-before'], c.TEXT);
  }
}
