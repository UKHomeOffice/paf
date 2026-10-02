import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAdditionalPersonIdPage extends basePage {
  readonly expectedPageTitle = "What are the person's forms of identification?";
  readonly pageHeading = this.headerText;

  async answerAdditionalPersonIdentification() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.additionalPersonReportIdAnswer(c);
    await this.clickContinueButton();
  }

  async additionalPersonReportIdAnswer(data: Record<string, string>) {
    await this.completeTextPage(['personAddPassport', 'personAddId', 'personAddNi'], data.TEXT);
  }
}
