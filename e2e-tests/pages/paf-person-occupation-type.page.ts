import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationTypePage extends basePage {
  readonly expectedPageTitle = 'What type of job or occupation does the person have?';
  readonly pageHeading = this.headerText;

  async answerOccupationType() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personOccupationTypeAnswer(c);
  }
  
  async personOccupationTypeAnswer(data: Record<string, string>) {
    await this.autocompleteById('report-person-occupation-type', data.OCCUPATION);
    await this.clickContinueButton();
  }
}
