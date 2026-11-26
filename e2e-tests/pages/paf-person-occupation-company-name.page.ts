import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationCompanyNamePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the name of the company the person works at? – GOV.UK"
      : "What is the name of the company the person works at? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerEmployerCompanyName() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personOccupationCompanyNameAnswer(c);
  }
  
  async personOccupationCompanyNameAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-occupation-company-name'], data.TEXT);
  }
}
