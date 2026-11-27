import { basePage } from './base-page';

export class pafPersonWhereIsThePersonNowPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Where is the person now? – GOV.UK"
      : "Where is the person now? – GOV.UK";
  }

  async answerPersonCurrentLocation(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.selectAndContinue(value);
  }
}
