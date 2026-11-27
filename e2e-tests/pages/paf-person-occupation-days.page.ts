import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationDaysPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What days does the person work? – GOV.UK"
      : "What days does the person work? – GOV.UK";
  }

  async answerWorkDays() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(['report-person-occupation-days'], c.TEXT);
  }
}
