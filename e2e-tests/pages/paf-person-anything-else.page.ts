import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonAnythingElsePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Please tell us anything else about the person you are reporting that you think we should know – GOV.UK"
      : "Please tell us anything else about the person you are reporting that you think we should know – GOV.UK";
  }

  async answerAdditionalPersonInformation() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(['report-person-anything-else'], c.TEXT);
  }
}
