import { basePage } from './base-page';

export class pafPersonContactDetailsOutsideUkPage extends basePage {
  readonly expectedPageTitle = "What is the person's contact details";
  readonly pageHeading = this.headerText;
  async personContactDetailsOutsideUkAnswer(data: Record<string, string>) {
    await this.fillIfPresent('report-person-location-outside-uk-mobile', data.TELEPHONE);
    await this.fillIfPresent('report-person-location-outside-uk-phone', data.TELEPHONE);
    await this.fillIfPresent('report-person-location-outside-uk-email', data.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
