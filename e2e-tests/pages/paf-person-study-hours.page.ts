import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyHoursPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What hours of the day does the person study? – GOV.UK"
      : "What hours of the day does the person study? – GOV.UK";
  }

  async answerStudyHours() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(['report-person-study-hours'], c.TEXT);
  }
}
