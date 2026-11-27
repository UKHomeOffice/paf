import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeMoreInformationPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: If you have any more information about when it is happening please tell us here: – GOV.UK"
      : "If you have any more information about when it is happening please tell us here: – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAdditionalCrimeTimeInformation() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(['when-will-crime-happen-more-info'], c.TEXT);
  }
}
