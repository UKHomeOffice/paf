import { basePage } from './base-page';

export class pafPersonWhereIsThePersonNowPage extends basePage {
  readonly expectedPageTitle = 'Where is the person now?';
  readonly pageHeading = this.headerText;

  async answerPersonCurrentLocation(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.selectAndContinue(value);
  }
}
