import { basePage } from './base-page';

export class pafOtherInformationPage extends basePage {
  readonly expectedPageTitle = 'Other information';
  readonly pageHeading = this.headerText;
  readonly otherInformationBox = this.page.locator('#other-info-description');

  async otherInformationAnswer(data: Record<string, string>) {
    await this.otherInformationBox.fill(data.TEXT);
    await this.clickContinueButton();
  }
}
