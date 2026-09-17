import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeDateTimeCrimeWillHappenPage extends basePage {
  readonly expectedPageTitle = 'Tell us the time and date the crime will happen';
  readonly pageHeading = this.headerText;
  async crimeDateTimeAnswer() { await this.fillDateByPrefix('date-crime-will-happen', c.FUTURE_DATE); await this.fillIfPresent('time-crime-will-happen-hour', c.TIME_HOUR); await this.fillIfPresent('time-crime-will-happen-minute', c.TIME_MINUTE); await this.clickContinueButton(); }
}


