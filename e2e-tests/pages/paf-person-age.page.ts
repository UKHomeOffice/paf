import { basePage } from './base-page';

export class pafPersonAgePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's approximate age? – GOV.UK"
      : "What is the person's approximate age? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerPersonAge(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.selectAndContinue(value);
  }
}
