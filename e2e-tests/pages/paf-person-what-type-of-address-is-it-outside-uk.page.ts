import { basePage } from './base-page';

export class pafPersonWhatTypeOfAddressIsItOutsideUkPage extends basePage {
  readonly expectedPageTitle = 'What type of address is it?';
  readonly pageHeading = this.headerText;
  async personAddressTypeHomeAddressOutsideUkAnswer() { await this.selectAndContinue('Home address'); }
  async personAddressTypeRelativesAddressOutsideUkAnswer() { await this.selectAndContinue("Relative's address"); }
  async personAddressTypeWorkAddressOutsideUkAnswer() { await this.selectAndContinue('Work address'); }
}


