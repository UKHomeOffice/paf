import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonTravellingToTheUkPage extends basePage {

  readonly personCountryTravellingFromBox = this.page.locator('#report-person-location-travel-to-uk-country');
  readonly personTravellingHowBox = this.page.locator('#report-person-location-travel-to-uk-how');
  readonly personWhereInUkWillArriveBox = this.page.locator('#report-person-location-travel-to-uk-where');

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Travelling to the UK – GOV.UK"
      : "Travelling to the UK – GOV.UK";
  }

  async answerPersonTravellingFrom() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personCountryTravellingFromBox.fill(c.COUNTRY);
    await this.page.keyboard.press('Tab');
    await this.personTravellingHowBox.fill(c.TRAVEL_DETAILS);
    await this.personWhereInUkWillArriveBox.fill(c.TRAVEL_DETAILS);
    await this.clickContinueButton();
  }

}
