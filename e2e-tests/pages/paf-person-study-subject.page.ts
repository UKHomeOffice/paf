import { basePage } from './base-page';

export class pafPersonStudySubjectPage extends basePage {
  readonly expectedPageTitle = 'Do you know the course or the subject of study?';
  readonly pageHeading = this.headerText;
  async personStudySubjectAnswer() { await this.completeTextPage(['report-person-study-subject']); }
}


