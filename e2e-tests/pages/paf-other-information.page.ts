import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOtherInformationPage extends basePage {
  readonly expectedPageTitle = 'Other information';
  readonly pageHeading = this.headerText;
  readonly otherInformationBox = this.page.locator('#other-info-description');

  async answerOtherInformation() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.otherInformationAnswer(c);
  }

  async otherInformationAnswer(data: Record<string, string>) {
    await this.otherInformationBox.fill(data.TEXT);
    await this.clickContinueButton();
  }
}
