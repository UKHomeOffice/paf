import { basePage } from './base-page';

export class pafOtherInformationPage extends basePage {
  readonly expectedPageTitle = 'Other information';
  readonly pageHeading = this.headerText;
  readonly otherInformationBox = this.page.locator('#other-info-description');

  async otherInformationAnswer() {
    await this.otherInformationBox.fill('Text');
    await this.clickContinueButton();
  }
}
