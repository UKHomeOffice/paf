import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationHoursPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What hours of the day does the person work? – GOV.UK"
      : "What hours of the day does the person work? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerWorkHours() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personOccupationHoursAnswer(c);
  }
  
  async personOccupationHoursAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-occupation-hours'], data.TEXT);
  }
}
