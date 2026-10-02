import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafAboutYouHowDoYouKnowThePersonPage extends basePage {
  readonly expectedPageTitle = 'How do you know this person/ these people?';
  readonly pageHeading = this.headerText;

  async answerHowDoYouKnowThePerson() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.aboutYouHowDoYouKnowThePersonAnswer(c);
  }
  async aboutYouHowDoYouKnowThePersonAnswer(data: Record<string, string>) {
    await this.completeTextPage(['how-do-you-know-the-person'], data.TEXT);
  }
}
