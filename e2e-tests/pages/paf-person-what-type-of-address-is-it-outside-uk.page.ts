import { basePage } from './base-page';

export class pafPersonWhatTypeOfAddressIsItOutsideUkPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What type of address is it? – GOV.UK"
      : "What type of address is it? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerPersonAddressTypeOutsideUk(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.selectAndContinue(value.toLowerCase() === 'relative' ? "Relative's address" : value);
  }
}
