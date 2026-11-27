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
    await this.fillIfPresent('personAddFirstName', c.FIRST_NAME);
    await this.fillIfPresent('personAddFamilyName', c.LAST_NAME);
    await this.fillIfPresent('personAddNickname', c.NICKNAME);
    await this.clickContinueButton();
  }
}
