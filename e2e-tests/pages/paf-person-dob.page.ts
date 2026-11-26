import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonDobPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's date of birth? – GOV.UK"
      : "What is the person's date of birth? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerPersonDateOfBirth() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personReportDobAnswer(c);
  }
  
  async personReportDobAnswer(data: Record<string, string>) {
    await this.fillDateByPrefix('report-person-dob', data.DOB);
    await this.clickContinueButton();
  }
}
