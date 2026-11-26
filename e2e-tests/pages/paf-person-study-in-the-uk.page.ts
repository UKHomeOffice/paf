import { basePage } from './base-page';

export class pafPersonStudyInTheUkPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Does the person study in the UK? – GOV.UK"
      : "Does the person study in the UK? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerStudyInUk(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(value);
  }
}
