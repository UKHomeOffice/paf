import { basePage } from './base-page';

export class pafPersonWhatTypeOfAddressIsItPage extends basePage {
  readonly expectedPageTitle = 'What type of address is it?';
  readonly pageHeading = this.headerText;

  async answerPersonAddressType(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.selectAndContinue(value.toLowerCase() === 'relative' ? "Relative's address" : value);
  }
}
