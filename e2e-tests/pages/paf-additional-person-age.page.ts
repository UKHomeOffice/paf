import { pafPersonAgePage } from './paf-person-age.page';

export class pafAdditionalPersonAgePage extends pafPersonAgePage {
  readonly expectedPageTitle = "What is the person's approximate age?";
  readonly pageHeading = this.headerText;

  async additionalPersonReportAge0To17Answer() { await this.personReportAge0To17Answer(); }
  async additionalPersonReportAge18To24Answer() { await this.personReportAge18To24Answer(); }
  async additionalPersonReportAge25To24Answer() { await this.personReportAge25To24Answer(); }
  async additionalPersonReportAge35To44Answer() { await this.personReportAge35To44Answer(); }
  async additionalPersonReportAge45To54Answer() { await this.personReportAge45To54Answer(); }
  async additionalPersonReportAge55To64Answer() { await this.personReportAge55To64Answer(); }
  async additionalPersonReportAge65To74Answer() { await this.personReportAge65To74Answer(); }
  async additionalPersonReportAge75PlusAnswer() { await this.personReportAge75PlusAnswer(); }
}

