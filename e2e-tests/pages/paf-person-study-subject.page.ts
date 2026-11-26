import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafPersonStudySubjectPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Do you know the course or the subject of study? – GOV.UK"
      : "Do you know the course or the subject of study? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerStudySubject() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.personStudySubjectAnswer(c);
  }
  
  async personStudySubjectAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-study-subject'], data.TEXT);
  }
}
