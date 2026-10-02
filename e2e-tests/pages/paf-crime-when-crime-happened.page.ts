import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeWhenCrimeHappenedPage extends basePage {
  readonly expectedPageTitle = 'When is the crime happening?';
  readonly pageHeading = this.headerText;

  async answerWhenCrimeHappens(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);

    switch (value) {
      case 'Happening now':
        return this.crimeHappeningNowAnswer(c);
      case 'Ongoing':
        return this.crimeOngoingAnswer(c);
      case 'Already happened':
        return this.crimeAlreadyHappenedAnswer(c);
      case 'Not yet happened':
        return this.crimeNotYetHappenedAnswer();
      case "I don't know":
        return this.crimeIdontKnowAnswer();
      default:
        throw new Error(`Invalid when crime happened: ${value}`);
    }
  }

  async crimeHappeningNowAnswer(data: Record<string, string>) {
    await this.selectByLabel('Happening now');
    await this.fillIfPresent('happening-now-info', data.TEXT);
    await this.clickContinueButton();
  }
  async crimeOngoingAnswer(data: Record<string, string>) {
    await this.selectByLabel('Ongoing');
    await this.fillIfPresent('ongoing-info', data.TEXT);
    await this.clickContinueButton();
  }
  async crimeAlreadyHappenedAnswer(data: Record<string, string>) {
    await this.selectByLabel('Already happened');
    await this.fillIfPresent('already-happened-info', data.TEXT);
    await this.clickContinueButton();
  }
  async crimeNotYetHappenedAnswer() {
    await this.selectAndContinue('Not yet happened');
  }
  async crimeIdontKnowAnswer() {
    await this.selectAndContinue("I don't know");
  }
}
