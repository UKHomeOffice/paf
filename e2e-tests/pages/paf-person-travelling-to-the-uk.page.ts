import { basePage } from './base-page';

export class pafPersonTravellingToTheUkPage extends basePage {
  readonly expectedPageTitle = 'Travelling to the UK';
  readonly pageHeading = this.headerText;
  readonly personCountryTravellingFromBox = this.page.locator('#report-person-location-travel-to-uk-country');
  readonly personTravellingHowBox = this.page.locator('#report-person-location-travel-to-uk-how');
  readonly personWhereInUkWillArriveBox = this.page.locator('#report-person-location-travel-to-uk-where');

  async personTravellingToUkAnswer(data: Record<string, string>) {
    await this.personCountryTravellingFromBox.fill(data.COUNTRY);
    await this.page.keyboard.press('Tab');
    await this.personTravellingHowBox.fill(data.TRAVEL_DETAILS);
    await this.personWhereInUkWillArriveBox.fill(data.TRAVEL_DETAILS);
    await this.clickContinueButton();
  }
}
