import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationCompanyOwnerPage extends basePage {
  readonly expectedPageTitle = 'Company Owner';
  readonly pageHeading = this.headerText;
  async personOccupationCompanyOwnerYesAnswer() { await this.selectByLabel('Yes'); await this.fillIfPresent('report-person-occupation-company-owner', c.TEXT); await this.clickContinueButton(); }
  async personOccupationCompanyOwnerNoAnswer() { await this.answerYesNoUnknown('No'); }
  async personOccupationCompanyOwnerIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


