import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudySubjectPage extends basePage {
  readonly expectedPageTitle = 'Do you know the course or the subject of study?';
  readonly pageHeading = this.headerText;

  async answerStudySubject() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.personStudySubjectAnswer(c);
  }
  
  async personStudySubjectAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-study-subject'], data.TEXT);
  }
}
