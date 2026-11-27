import { basePage } from './base-page';

export class pafAboutYouCanUseInfoWithoutRiskPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Can we act on this information without putting you or others at risk? – GOV.UK"
      : "Can we act on this information without putting you or others at risk? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerCanActWithoutRisk(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(value);
  }
}
