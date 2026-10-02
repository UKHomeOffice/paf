import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonOccupationCompanyNamePage extends basePage {
  readonly expectedPageTitle = 'What is the name of the company the person works at?';
  readonly pageHeading = this.headerText;

  async answerEmployerCompanyName() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personOccupationCompanyNameAnswer(c);
  }
  
  async personOccupationCompanyNameAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-occupation-company-name'], data.TEXT);
  }
}
