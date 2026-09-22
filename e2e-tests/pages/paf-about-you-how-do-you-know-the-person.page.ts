import { basePage } from './base-page';

export class pafAboutYouHowDoYouKnowThePersonPage extends basePage {
  readonly expectedPageTitle = 'How do you know this person/ these people?';
  readonly pageHeading = this.headerText;
  async aboutYouHowDoYouKnowThePersonAnswer() { await this.completeTextPage(['how-do-you-know-the-person']); }
}


