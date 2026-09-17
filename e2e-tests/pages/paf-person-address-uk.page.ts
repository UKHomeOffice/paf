import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonAddressUkPage extends basePage {
  readonly expectedPageTitle = "What is the person's address (UK)?";
  readonly pageHeading = this.headerText;
  async personAddressUkAnswer() { await this.fillMany(['report-person-location-uk-address-line1', 'report-person-location-uk-address-line2', 'report-person-location-uk-address-town', 'report-person-location-uk-address-county'], c.ADDRESS_LINE_1); await this.fillIfPresent('report-person-location-uk-address-postcode', c.POSTCODE); await this.clickContinueButton(); }
}


