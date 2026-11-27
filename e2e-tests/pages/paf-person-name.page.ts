import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonNamePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's name? – GOV.UK"
      : "What is the person's name? – GOV.UK";
  }

  async answerPersonName() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillIfPresent('report-person-first-name', c.FIRST_NAME);
    await this.fillIfPresent('report-person-family-name', c.LAST_NAME);
    await this.fillIfPresent('report-person-nickname', c.NICKNAME);
    await this.clickContinueButton();
  }
}
