import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeDateTimeCrimeWillHappenPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Tell us the time and date the crime will happen, if you know them – GOV.UK"
      : "Tell us the time and date the crime will happen, if you know them – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerCrimeDateTime() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillDateByPrefix('date-crime-will-happen', c.FUTURE_DATE);
    await this.fillIfPresent('time-crime-will-happen-hour', c.TIME_HOUR);
    await this.fillIfPresent('time-crime-will-happen-minute', c.TIME_MINUTE);
    await this.clickContinueButton();
  }
}
