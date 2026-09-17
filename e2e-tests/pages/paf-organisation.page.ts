import { basePage } from './base-page';

export class pafOrganisationPage extends basePage {
  readonly expectedPageTitle = 'The Organisation';
  readonly pageHeading = this.headerText;
  async organisationYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async organisationNoAnswer() { await this.answerYesNoUnknown('No'); }
  async organisationIdontKnowAnswer() { await this.answerYesNoUnknown("I don't know"); }
}


