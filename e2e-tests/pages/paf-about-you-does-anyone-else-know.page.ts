import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouDoesAnyoneElseKnowPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Does anyone else know about the crime? – GOV.UK"
      : "Does anyone else know about the crime? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerDoesAnyoneElseKnow() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.aboutYouDoesAnyoneElseKnowAnswer(c);
  }

  async aboutYouDoesAnyoneElseKnowAnswer(data: Record<string, string>) {
    await this.completeTextPage(['does-anyone-else-know'], data.TEXT);
  }
}
