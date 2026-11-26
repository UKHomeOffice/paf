import { basePage } from './base-page';

export class pafAboutYouGenderPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is your gender? – GOV.UK"
      : "What is your gender? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAboutYouGender(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.selectAndContinue(value);
  }
}
