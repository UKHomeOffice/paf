import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeAnotherLocationPage extends basePage {
  readonly expectedPageTitle = 'Do you want to tell us about another location where the crime is taking place?';
  readonly pageHeading = this.headerText;
  async crimeAnotherLocationYesAnswer() { await this.selectByLabel('Yes'); await this.fillMany(['crime-another-location-address-line1', 'crime-another-location-address-line2', 'crime-another-location-address-town', 'crime-another-location-address-county'], c.ADDRESS_LINE_1); await this.fillIfPresent('crime-another-location-address-postcode', c.POSTCODE); await this.fillIfPresent('crime-another-location-phone', c.TELEPHONE); await this.autocompleteById('crime-another-location-country', 'United Kingdom'); await this.clickContinueButton(); }
  async crimeAnotherLocationNoAnswer() { await this.selectAndContinue('No'); }
}


