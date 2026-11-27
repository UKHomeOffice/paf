import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouHowDoYouKnowThePersonPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: How do you know this person/ these people? – GOV.UK"
      : "How do you know this person/ these people? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerHowDoYouKnowThePerson() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.completeTextPage(['how-do-you-know-the-person'], c.TEXT); 
  }
}
