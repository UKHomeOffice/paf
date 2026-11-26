import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeWhenCrimeHappenedPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: When is the crime happening? – GOV.UK"
      : "When is the crime happening? – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerWhenCrimeHappens(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());

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
