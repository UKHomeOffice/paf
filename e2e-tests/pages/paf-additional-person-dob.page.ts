import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAdditionalPersonDobPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's date of birth? – GOV.UK"
      : "What is the person's date of birth? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAdditionalPersonDateOfBirth() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.additionalPersonReportDobAnswer(c);
  }

  async additionalPersonReportDobAnswer(data: Record<string, string>) {
    await this.fillDateByPrefix('personAddDob', data.DOB);
    await this.clickContinueButton();
  }
}
