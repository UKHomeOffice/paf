import { basePage } from './base-page';

export class pafPersonWhatTypeOfAddressIsItPage extends basePage {
  readonly expectedPageTitle = 'What type of address is it?';
  readonly pageHeading = this.headerText;
  async personAddressTypeHomeAddressAnswer() { await this.selectAndContinue('Home address'); }
  async personAddressTypeRelativesAddressAnswer() { await this.selectAndContinue("Relative's address"); }
  async personAddressTypeWorkAddressAnswer() { await this.selectAndContinue('Work address'); }
}


