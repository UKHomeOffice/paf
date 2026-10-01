import { basePage } from './base-page';

export class pafPersonOccupationCompanyOwnerPage extends basePage {
  readonly expectedPageTitle = 'Company Owner';
  readonly pageHeading = this.headerText;
  async personOccupationCompanyOwnerYesAnswer(data: Record<string, string>) {
    await this.selectByLabel('Yes');
    await this.fillIfPresent('report-person-occupation-company-owner', data.TEXT);
    await this.clickContinueButton();
  }
}
