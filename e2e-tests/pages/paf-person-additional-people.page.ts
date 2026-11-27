import { basePage } from './base-page';

export class pafPersonAdditionalPeoplePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Do you want to tell us about another person who is involved in the same crime? – GOV.UK"
      : "Do you want to tell us about another person who is involved in the same crime? – GOV.UK";
  }

  async answerAnotherPersonInvolved(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(value);
  }
}
