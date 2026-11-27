import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyDaysPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What days does the person study? – GOV.UK"
      : "What days does the person study? – GOV.UK";
  }

  async answerStudyDays() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(['report-person-study-days'], c.TEXT);
  }
}
