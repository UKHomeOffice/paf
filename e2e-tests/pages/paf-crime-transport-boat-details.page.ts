import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeTransportBoatDetailsPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What are the boat details? – GOV.UK"
      : "What are the boat details? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerBoatDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.fillIfPresent('boat-name', c.TEXT);
    await this.autocompleteById('boat-country-departure', c.COUNTRY);
    await this.fillIfPresent('port-departure', c.TEXT);
    await this.fillIfPresent('port-arrival', c.TEXT);
    await this.fillIfPresent('port-departure-time', c.DEPARTURE_TIME);
    await this.fillIfPresent('port-arrival-time', c.ARRIVAL_TIME);
    await this.clickContinueButton();
  }
}
