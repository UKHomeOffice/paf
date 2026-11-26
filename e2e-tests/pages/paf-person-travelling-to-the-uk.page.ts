import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonTravellingToTheUkPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Travelling to the UK – GOV.UK"
      : "Travelling to the UK – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerPersonTravellingFrom() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personTravellingToUkAnswer(c);
  }
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
