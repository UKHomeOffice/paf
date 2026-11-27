import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOtherInformationAnotherCrimePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Do you want to report another crime by the same person or business? – GOV.UK"
      : "Do you want to report another crime by the same person or business? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAnotherCrime(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    if (value.trim().toLowerCase() === 'yes') {
      await this.selectByLabel('Yes');
      await this.fillIfPresent('other-info-another-crime-description', c.TEXT);
      await this.clickContinueButton();
    } else {
      await this.answerYesNoUnknown('No');
    }
  }

}
