import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonIdPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What are the person's forms of identification? – GOV.UK"
      : "What are the person's forms of identification? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerPersonIdentification() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personReportIdAnswer(c);
  }
  
  async personReportIdAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-passport', 'report-person-id', 'report-person-ni'], data.TEXT);
  }
}
