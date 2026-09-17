import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonContactDetailsPage extends basePage {
  readonly expectedPageTitle = "What is the person's contact details";
  readonly pageHeading = this.headerText;
  async personContactDetailsAnswer() { await this.fillIfPresent('report-person-location-mobile', c.TELEPHONE); await this.fillIfPresent('report-person-location-phone', c.TELEPHONE); await this.fillIfPresent('report-person-location-email', c.SAS_HOF_EMAIL); await this.clickContinueButton(); }
}


