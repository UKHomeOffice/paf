import { basePage } from './base-page';

export class pafPersonOccupationTypePage extends basePage {
  readonly expectedPageTitle = 'What type of job or occupation does the person have?';
  readonly pageHeading = this.headerText;
  async personOccupationTypeAnswer(data: Record<string, string>) {
    await this.autocompleteById('report-person-occupation-type', data.OCCUPATION);
    await this.clickContinueButton();
  }
}
