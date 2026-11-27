import { basePage } from './base-page';

export class pafPersonStudyPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Does the person study? – GOV.UK"
      : "Does the person study? – GOV.UK";
  }

  async answerStudyStatus(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(value);
  }
}
