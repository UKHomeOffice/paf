import { pafPersonAgePage } from './paf-person-age.page';

export class pafAdditionalPersonAgePage extends pafPersonAgePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's approximate age? – GOV.UK"
      : "What is the person's approximate age? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAdditionalPersonAge(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.selectAndContinue(value);
  }
}
