import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyInstitutionOwnerPage extends basePage {
  readonly expectedPageTitle = 'Institution Owner';
  readonly pageHeading = this.headerText;
  async personStudyInstitutionOwnerYesAnswer() { await this.selectByLabel('Yes'); await this.fillIfPresent('report-person-study-institution-owner', c.TEXT); await this.clickContinueButton(); }
  async personStudyInstitutionOwnerNoAnswer() { await this.answerYesNoUnknown('No'); }
  async personStudyInstitutionOwnerIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


