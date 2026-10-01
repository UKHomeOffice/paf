import { basePage } from './base-page';

export class pafPersonStudyInstitutionOwnerPage extends basePage {
  readonly expectedPageTitle = 'Institution Owner';
  readonly pageHeading = this.headerText;
  async personStudyInstitutionOwnerYesAnswer(data: Record<string, string>) {
    await this.selectByLabel('Yes');
    await this.fillIfPresent('report-person-study-institution-owner', data.TEXT);
    await this.clickContinueButton();
  }
}
