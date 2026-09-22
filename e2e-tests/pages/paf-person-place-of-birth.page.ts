import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonPlaceOfBirthPage extends basePage {
  readonly expectedPageTitle = "What is the person's place of birth?";
  readonly pageHeading = this.headerText;
  async personReportPlaceOfBirthAnswer() { await this.completeTextPage(['report-person-place-of-birth'], c.COUNTRY); }
}


