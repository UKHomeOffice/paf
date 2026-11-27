import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonNationalityPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's nationality? – GOV.UK"
      : "What is the person's nationality? – GOV.UK";
  }

  async answerPersonNationality() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.autocompleteById('report-person-nationality', c.NATIONALITY);
    await this.clickContinueButton();
  }
}
