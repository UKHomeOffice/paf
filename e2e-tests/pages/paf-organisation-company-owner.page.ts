import { basePage } from './base-page';

export class pafOrganisationCompanyOwnerPage extends basePage {
  readonly expectedPageTitle = 'Company owner';
  readonly pageHeading = this.headerText;
  async organisationCompanyOwnerYesAnswer(data: Record<string, string>) {
    await this.selectByLabel('Yes');
    await this.fillIfPresent('company-owner', data.TEXT);
    await this.clickContinueButton();
  }
}
