import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeWhenCrimeHappenedPage extends basePage {
  readonly expectedPageTitle = 'When is the crime happening?';
  readonly pageHeading = this.headerText;
  async crimeHappeningNowAnswer() { await this.selectByLabel('Happening now'); await this.fillIfPresent('happening-now-info', c.TEXT); await this.clickContinueButton(); }
  async crimeOngoingAnswer() { await this.selectByLabel('Ongoing'); await this.fillIfPresent('ongoing-info', c.TEXT); await this.clickContinueButton(); }
  async crimeAlreadyHappenedAnswer() { await this.selectByLabel('Already happened'); await this.fillIfPresent('already-happened-info', c.TEXT); await this.clickContinueButton(); }
  async crimeNotYetHappenedAnswer() { await this.selectAndContinue('Not yet happened'); }
  async crimeIdontKnowAnswer() { await this.selectAndContinue("I don't know"); }
}


