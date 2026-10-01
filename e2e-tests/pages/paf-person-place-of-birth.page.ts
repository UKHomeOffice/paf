import { basePage } from './base-page';

export class pafPersonPlaceOfBirthPage extends basePage {
  readonly expectedPageTitle = "What is the person's place of birth?";
  readonly pageHeading = this.headerText;
  async personReportPlaceOfBirthAnswer(data: Record<string, string>) {
    await this.completeTextPage(['report-person-place-of-birth'], data.COUNTRY);
  }
}
