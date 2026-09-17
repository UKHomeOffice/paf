import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonTravellingToTheUkPage extends basePage {
  readonly expectedPageTitle = 'Travelling to the UK';
  readonly pageHeading = this.headerText;
  readonly personCountryTravellingFromBox = this.page.locator('#report-person-location-travel-to-uk-country');
  readonly personTravellingHowBox = this.page.locator('#report-person-location-travel-to-uk-how');
  readonly personWhereInUkWillArriveBox = this.page.locator('#report-person-location-travel-to-uk-where');

  async personTravellingToUkAnswer() {
    await this.personCountryTravellingFromBox.fill(c.COUNTRY);
    await this.page.keyboard.press('Tab');
    await this.personTravellingHowBox.fill('0000000000');
    await this.personWhereInUkWillArriveBox.fill('0000000000');
    await this.clickContinueButton();
  }
}


