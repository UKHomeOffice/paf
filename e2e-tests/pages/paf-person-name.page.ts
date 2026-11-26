import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonNamePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's name? – GOV.UK"
      : "What is the person's name? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerPersonName() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personReportNameAnswer(c);
  }
  
  async personReportNameAnswer(data: Record<string, string>) {
    await this.fillIfPresent('report-person-first-name', data.FIRST_NAME);
    await this.fillIfPresent('report-person-family-name', data.LAST_NAME);
    await this.fillIfPresent('report-person-nickname', data.NICKNAME);
    await this.clickContinueButton();
  }
}
