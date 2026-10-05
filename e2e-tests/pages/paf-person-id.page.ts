import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonIdPage extends basePage {
  readonly expectedPageTitle = "What are the person's forms of identification?";
  readonly pageHeading = this.headerText;

  async answerPersonIdentification() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personReportIdAnswer(c);
  }
  
  async personReportIdAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-passport', 'report-person-id', 'report-person-ni'], data.TEXT);
  }
}
