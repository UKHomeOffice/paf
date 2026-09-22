import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonAddressOutsideUkPage extends basePage {
  readonly expectedPageTitle = "What is the person's address (Outside UK)?";
  readonly pageHeading = this.headerText;
  async personAddressOutsideUkAnswer() { await this.fillMany(['report-person-location-outside-uk-address-line1', 'report-person-location-outside-uk-address-line2', 'report-person-location-outside-uk-address-town', 'report-person-location-outside-uk-address-county', 'report-person-location-outside-uk-address-postcode'], c.ADDRESS_LINE_1); await this.autocompleteById('report-person-location-outside-uk-address-country', c.COUNTRY); await this.clickContinueButton(); }
}


