import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonNationalityPage extends basePage {
  readonly expectedPageTitle = "What is the person's nationality?";
  readonly pageHeading = this.headerText;

  async answerPersonNationality() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personReportNationalityAnswer(c);
  }
  
  async personReportNationalityAnswer(data: Record<string, string>) {
    await this.autocompleteById('report-person-nationality', data.NATIONALITY);
    await this.clickContinueButton();
  }
}
