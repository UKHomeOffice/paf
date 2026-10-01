import { basePage } from './base-page';

export class pafPersonContactDetailsPage extends basePage {
  readonly expectedPageTitle = "What is the person's contact details";
  readonly pageHeading = this.headerText;
  async personContactDetailsAnswer(data: Record<string, string>) {
    await this.fillIfPresent('report-person-location-mobile', data.TELEPHONE);
    await this.fillIfPresent('report-person-location-phone', data.TELEPHONE);
    await this.fillIfPresent('report-person-location-email', data.SAS_HOF_EMAIL);
    await this.clickContinueButton();
  }
}
