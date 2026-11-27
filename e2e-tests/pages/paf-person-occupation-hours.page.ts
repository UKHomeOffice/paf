import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationHoursPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What hours of the day does the person work? – GOV.UK"
      : "What hours of the day does the person work? – GOV.UK";
  }

  async answerWorkHours() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(['report-person-occupation-hours'], c.TEXT);
  }
}
