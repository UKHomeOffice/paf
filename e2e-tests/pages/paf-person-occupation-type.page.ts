import { basePage } from './base-page';

export class pafPersonOccupationTypePage extends basePage {
  readonly expectedPageTitle = 'What type of job or occupation does the person have?';
  readonly pageHeading = this.headerText;
  async personOccupationTypeAnswer() { await this.autocompleteById('report-person-occupation-type', 'Chef'); await this.clickContinueButton(); }
}


