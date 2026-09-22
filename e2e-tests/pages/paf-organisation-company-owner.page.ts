import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOrganisationCompanyOwnerPage extends basePage {
  readonly expectedPageTitle = 'Company owner';
  readonly pageHeading = this.headerText;
  async organisationCompanyOwnerYesAnswer() { await this.selectByLabel('Yes'); await this.fillIfPresent('company-owner', c.TEXT); await this.clickContinueButton(); }
  async organisationCompanyOwnerNoAnswer() { await this.answerYesNoUnknown('No'); }
  async organisationCompanyOwnerIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


