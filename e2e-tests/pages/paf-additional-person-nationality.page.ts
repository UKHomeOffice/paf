import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAdditionalPersonNationalityPage extends basePage {
  readonly expectedPageTitle = "What is the person's nationality?";
  readonly pageHeading = this.headerText;

  async answerAdditionalPersonNationality() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.additionalPersonReportNationalityAnswer(c);
  }

  async additionalPersonReportNationalityAnswer(data: Record<string, string>) {
    await this.autocompleteById('personAddNationality', data.NATIONALITY);
    await this.clickContinueButton();
  }
}
