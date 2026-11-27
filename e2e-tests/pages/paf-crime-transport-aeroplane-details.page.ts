import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeTransportAeroplaneDetailsPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What are the aeroplane details? – GOV.UK"
      : "What are the aeroplane details? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAeroplaneDetails() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.autocompleteById('airline-company', c.AIRLINE);
    await this.fillIfPresent('airline-flight-number', c.FLIGHT_NUMBER);
    await this.autocompleteById('airline-country-departure', c.COUNTRY);
    await this.fillIfPresent('airport-departure', c.TEXT);
    await this.fillIfPresent('airport-arrival', c.TEXT);
    await this.fillIfPresent('airport-departure-time', c.DEPARTURE_TIME);
    await this.fillIfPresent('airport-arrival-time', c.ARRIVAL_TIME);
    await this.clickContinueButton();
  }
}
