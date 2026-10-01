import { basePage } from './base-page';

export class pafCrimeDateTimeCrimeWillHappenPage extends basePage {
  readonly expectedPageTitle = 'Tell us the time and date the crime will happen';
  readonly pageHeading = this.headerText;
  async crimeDateTimeAnswer(data: Record<string, string>) {
    await this.fillDateByPrefix('date-crime-will-happen', data.FUTURE_DATE);
    await this.fillIfPresent('time-crime-will-happen-hour', data.TIME_HOUR);
    await this.fillIfPresent('time-crime-will-happen-minute', data.TIME_MINUTE);
    await this.clickContinueButton();
  }
}
