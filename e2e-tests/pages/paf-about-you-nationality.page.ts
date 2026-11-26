import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouNationalityPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is your nationality? – GOV.UK"
      : "What is your nationality? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAboutYouNationality() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.aboutYouNationalityAnswer(c);
  }

  async aboutYouNationalityAnswer(data: Record<string, string>) {
    await this.autocompleteById('about-you-nationality', data.NATIONALITY);
    await this.clickContinueButton();
  }
}
