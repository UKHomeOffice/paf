import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonPlaceOfBirthPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the person's place of birth? – GOV.UK"
      : "What is the person's place of birth? – GOV.UK";
  }

  async answerPersonPlaceOfBirth() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(['report-person-place-of-birth'], c.COUNTRY);
  }
}
