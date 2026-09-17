import { basePage } from './base-page';

export class pafOrganisationCompanyAnotherCompanyPage extends basePage {
  readonly expectedPageTitle = 'Do you want to tell us about another company, business or education provider that is involved in the same crime?';
  readonly pageHeading = this.headerText;
  async organisationCompanyAnotherCompanyYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async organisationCompanyAnotherCompanyNoAnswer() { await this.answerYesNoUnknown('No'); }
}


