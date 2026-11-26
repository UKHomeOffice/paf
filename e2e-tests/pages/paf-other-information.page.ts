import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOtherInformationPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Other information – GOV.UK"
      : "Other information – GOV.UK";
  }
  readonly pageHeading = this.headerText;
  readonly otherInformationBox = this.page.locator('#other-info-description');

  async answerOtherInformation() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.otherInformationAnswer(c);
  }

  async otherInformationAnswer(data: Record<string, string>) {
    await this.otherInformationBox.fill(data.TEXT);
    await this.clickContinueButton();
  }
}
