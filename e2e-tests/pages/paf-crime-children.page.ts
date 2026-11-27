import { basePage } from './base-page';

export class pafCrimeChildrenPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Are there children involved? (A child is anyone under 18 years of age) – GOV.UK"
      : "Are there children involved? (A child is anyone under 18 years of age) – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerChildrenInvolved(childrenInvolved: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(childrenInvolved);
  }
}
