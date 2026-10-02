import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonPlaceOfBirthPage extends basePage {
  readonly expectedPageTitle = "What is the person's place of birth?";
  readonly pageHeading = this.headerText;

  async answerPersonPlaceOfBirth() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personReportPlaceOfBirthAnswer(c);
  }
  
  async personReportPlaceOfBirthAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-place-of-birth'], data.COUNTRY);
  }
}
