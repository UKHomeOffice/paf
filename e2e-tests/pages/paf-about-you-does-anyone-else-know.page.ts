import { basePage } from './base-page';

export class pafAboutYouDoesAnyoneElseKnowPage extends basePage {
  readonly expectedPageTitle = 'Does anyone else know about the crime?';
  readonly pageHeading = this.headerText;
  async aboutYouDoesAnyoneElseKnowAnswer(data: Record<string, string>) {
    await this.completeTextPage(['does-anyone-else-know'], data.TEXT);
  }
}
