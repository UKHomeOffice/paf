import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonContactDetailsOutsideUkPage extends basePage {
  readonly expectedPageTitle = "What is the person's contact details";
  readonly pageHeading = this.headerText;
  async personContactDetailsOutsideUkAnswer() { await this.fillIfPresent('report-person-location-outside-uk-mobile', c.TELEPHONE); await this.fillIfPresent('report-person-location-outside-uk-phone', c.TELEPHONE); await this.fillIfPresent('report-person-location-outside-uk-email', c.SAS_HOF_EMAIL); await this.clickContinueButton(); }
}


