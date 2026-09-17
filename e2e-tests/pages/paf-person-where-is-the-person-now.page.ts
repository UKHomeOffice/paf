import { basePage } from './base-page';

export class pafPersonWhereIsThePersonNowPage extends basePage {
  readonly expectedPageTitle = 'Where is the person now?';
  readonly pageHeading = this.headerText;
  async personReportInTheUkAnswer() { await this.selectAndContinue('In the UK'); }
  async personReportOutsideTheUkAnswer() { await this.selectAndContinue('Outside the UK'); }
  async personReportAgeTravellingToTheUkAnswer() { await this.selectAndContinue('Travelling to the UK'); }
  async personReportIdontKnowAnswer() { await this.selectAndContinue("I don't know"); }
}


