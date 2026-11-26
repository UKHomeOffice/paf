import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyNamePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the name of college or university? – GOV.UK"
      : "What is the name of college or university? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerInstitutionName() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personStudyNameAnswer(c);
  }
  
  async personStudyNameAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-study-name'], data.TEXT);
  }
}
