import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudyNamePage extends basePage {
  readonly expectedPageTitle = 'What is the name of college or university?';
  readonly pageHeading = this.headerText;

  async answerInstitutionName() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personStudyNameAnswer(c);
  }
  
  async personStudyNameAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-study-name'], data.TEXT);
  }
}
