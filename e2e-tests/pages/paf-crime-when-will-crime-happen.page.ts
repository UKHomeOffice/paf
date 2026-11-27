import { basePage } from './base-page';

export class pafCrimeWhenWillCrimeHappenPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: When will the crime happen? – GOV.UK"
      : "When will the crime happen? – GOV.UK";
  }

  async answerWhenCrimeWillHappen(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());

    switch (value) {
      case 'In the next 24 hours':
        return await this.selectAndContinue('In the next 24 hours');
      case 'Date more than 24 hours in the future':
        return this.selectAndContinue('Date more than 24 hours in the future');
      case "I don't know":
        return await this.selectAndContinue("I don't know");
      default:
        throw new Error(`Invalid when will crime happen: ${value}`);
    }
  }
}
