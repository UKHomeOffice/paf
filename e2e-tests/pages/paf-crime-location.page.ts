import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeLocationPage extends basePage {
  readonly expectedPageTitle = 'Do you know where the crime takes place, took place or will take place?';
  readonly pageHeading = this.headerText;
  async crimeLocationYesAnswer() { await this.selectByLabel('Yes'); await this.fillMany(['crime-location-address-line1', 'crime-location-address-line2', 'crime-location-address-town', 'crime-location-address-county'], c.ADDRESS_LINE_1); await this.fillIfPresent('crime-location-address-postcode', c.POSTCODE); await this.fillIfPresent('crime-location-phone', c.TELEPHONE); await this.autocompleteById('crime-location-country', 'United Kingdom'); await this.clickContinueButton(); }
  async crimeLocationNoAnswer() { await this.selectAndContinue('No'); }
}


