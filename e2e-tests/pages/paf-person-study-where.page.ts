import { basePage } from './base-page';

export class pafPersonStudyWherePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Do you know where in the UK the person studies? – GOV.UK"
      : "Do you know where in the UK the person studies? – GOV.UK";
  }

  async answerStudyLocationKnown(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(value);
  }
}
