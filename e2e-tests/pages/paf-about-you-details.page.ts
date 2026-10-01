import { basePage } from './base-page';

export class pafAboutYouDetailsPage extends basePage {
  readonly expectedPageTitle = 'Please provide your details';
  readonly pageHeading = this.headerText;
  async aboutYouDetailsAnswer(firstName: string, lastName: string) {
    await this.fillIfPresent('about-you-first-name', firstName);
    await this.fillIfPresent('about-you-family-name', lastName);
    await this.clickContinueButton();
  }
}
