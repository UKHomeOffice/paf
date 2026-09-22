import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAdditionalPersonNamePage extends basePage {
  readonly expectedPageTitle = "What is the person's name?";
  readonly pageHeading = this.headerText;
  async additionalPersonReportNameAnswer() { await this.fillIfPresent('personAddFirstName', c.FIRST_NAME); await this.fillIfPresent('personAddFamilyName', c.LAST_NAME); await this.fillIfPresent('personAddNickname', c.NICKNAME); await this.clickContinueButton(); }
}


