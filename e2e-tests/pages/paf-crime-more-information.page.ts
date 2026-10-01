import { basePage } from './base-page';

export class pafCrimeMoreInformationPage extends basePage {
  readonly expectedPageTitle = 'If you have any more information about when it is happening please tell us here';
  readonly pageHeading = this.headerText;
  async crimeMoreInformationAnswer(data: Record<string, string>) {
    await this.completeTextPage(['when-will-crime-happen-more-info'], data.TEXT);
  }
}
