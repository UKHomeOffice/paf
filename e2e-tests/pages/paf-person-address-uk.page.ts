import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonAddressUkPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's address (UK)? – GOV.UK"
      : "What is the person's address (UK)? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerPersonAddressUk() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personAddressUkAnswer(c);
  }
  
  async personAddressUkAnswer(data: Record<string, string>) {
    await this.fillMany(
      [
        'report-person-location-uk-address-line1',
        'report-person-location-uk-address-line2',
        'report-person-location-uk-address-town',
        'report-person-location-uk-address-county'
      ],
      data.ADDRESS_LINE_1
    );
    await this.fillIfPresent('report-person-location-uk-address-postcode', data.POSTCODE);
    await this.clickContinueButton();
  }
}
