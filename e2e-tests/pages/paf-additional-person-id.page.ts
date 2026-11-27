import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAdditionalPersonIdPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What are the person's forms of identification? – GOV.UK"
      : "What are the person's forms of identification? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAdditionalPersonIdentification() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(['personAddPassport', 'personAddId', 'personAddNi'], c.TEXT);
    await this.clickContinueButton();
  }
}
