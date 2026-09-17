import { basePage } from './base-page';

export class pafCrimeDeliveryPage extends basePage {
  readonly expectedPageTitle = 'Tell us which of the following the crime involves';
  readonly pageHeading = this.headerText;
  async crimeDeliveryFreightOrCargoAnswer() { await this.selectAndContinue('Freight or cargo'); }
  async crimeDeliveryExpressMailCourierAnswer() { await this.selectAndContinue('Express mail/courier'); }
  async crimeDeliveryPostAnswer() { await this.selectAndContinue('Post'); }
  async crimeDeliveryNoneOfTheseAnswer() { await this.selectAndContinue('None of these'); }
  async crimeDeliveryIdontKnowAnswer() { await this.selectAndContinue("I don't know"); }
}


