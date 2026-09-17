import { basePage } from './base-page';

export class pafPersonAgePage extends basePage {
  readonly expectedPageTitle = "What is the person's approximate age?";
  readonly pageHeading = this.headerText;
  async personReportAge0To17Answer() { await this.selectAndContinue('0-17'); }
  async personReportAge18To24Answer() { await this.selectAndContinue('18-24'); }
  async personReportAge25To24Answer() { await this.selectAndContinue('25-34'); }
  async personReportAge35To44Answer() { await this.selectAndContinue('35-44'); }
  async personReportAge45To54Answer() { await this.selectAndContinue('45-54'); }
  async personReportAge55To64Answer() { await this.selectAndContinue('55-64'); }
  async personReportAge65To74Answer() { await this.selectAndContinue('65-74'); }
  async personReportAge75PlusAnswer() { await this.selectAndContinue('75+'); }
}


