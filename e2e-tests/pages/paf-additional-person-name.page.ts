import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAdditionalPersonNamePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's name? – GOV.UK"
      : "What is the person's name? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAdditionalPersonName() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.additionalPersonReportNameAnswer(c);
  }

  async additionalPersonReportNameAnswer(data: Record<string, string>) {
    await this.fillIfPresent('personAddFirstName', data.FIRST_NAME);
    await this.fillIfPresent('personAddFamilyName', data.LAST_NAME);
    await this.fillIfPresent('personAddNickname', data.NICKNAME);
    await this.clickContinueButton();
  }
}
