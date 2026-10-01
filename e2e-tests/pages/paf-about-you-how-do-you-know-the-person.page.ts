import { basePage } from './base-page';

export class pafAboutYouHowDoYouKnowThePersonPage extends basePage {
  readonly expectedPageTitle = 'How do you know this person/ these people?';
  readonly pageHeading = this.headerText;
  async aboutYouHowDoYouKnowThePersonAnswer(data: Record<string, string>) {
    await this.completeTextPage(['how-do-you-know-the-person'], data.TEXT);
  }
}
