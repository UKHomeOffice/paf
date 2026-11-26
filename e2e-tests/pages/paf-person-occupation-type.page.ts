import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationTypePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What type of job or occupation does the person have? – GOV.UK"
      : "What type of job or occupation does the person have? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerOccupationType() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personOccupationTypeAnswer(c);
  }
  
  async personOccupationTypeAnswer(data: Record<string, string>) {
    await this.autocompleteById('report-person-occupation-type', data.OCCUPATION);
    await this.clickContinueButton();
  }
}
