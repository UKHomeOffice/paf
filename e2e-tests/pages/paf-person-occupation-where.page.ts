import { basePage } from './base-page';

export class pafPersonOccupationWherePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Do you know where the person works? – GOV.UK"
      : "Do you know where the person works? – GOV.UK";
  }

  async answerWorkLocationKnown(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(value);
  }
}
