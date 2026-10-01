import { basePage } from './base-page';

export class pafPersonStudyNamePage extends basePage {
  readonly expectedPageTitle = 'What is the name of college or university?';
  readonly pageHeading = this.headerText;
  async personStudyNameAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-study-name'], data.TEXT);
  }
}
