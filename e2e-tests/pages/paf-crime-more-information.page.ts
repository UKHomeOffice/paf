import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeMoreInformationPage extends basePage {
  readonly expectedPageTitle = 'If you have any more information about when it is happening please tell us here';
  readonly pageHeading = this.headerText;

  async answerAdditionalCrimeTimeInformation() {
    await this.assertPageTitle(this.expectedPageTitle);
    await this.crimeMoreInformationAnswer(c);
  }

  async crimeMoreInformationAnswer(data: Record<string, string>) {
    await this.completeTextPage(['when-will-crime-happen-more-info'], data.TEXT);
  }
}
