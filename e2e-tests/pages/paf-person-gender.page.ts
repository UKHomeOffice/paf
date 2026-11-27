import { basePage } from './base-page';

export class pafPersonGenderPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's gender? – GOV.UK"
      : "What is the person's gender? – GOV.UK";
  }

  async answerPersonGender(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.selectAndContinue(value);
  }
}
