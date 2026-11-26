import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAdditionalPersonNationalityPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's nationality? – GOV.UK"
      : "What is the person's nationality? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAdditionalPersonNationality() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.additionalPersonReportNationalityAnswer(c);
  }

  async additionalPersonReportNationalityAnswer(data: Record<string, string>) {
    await this.autocompleteById('personAddNationality', data.NATIONALITY);
    await this.clickContinueButton();
  }
}
