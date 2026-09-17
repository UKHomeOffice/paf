import { basePage } from './base-page';

export class pafAboutYouCanUseInfoWithoutRiskPage extends basePage {
  readonly expectedPageTitle = 'Can we act on this information without putting you or others at risk';
  readonly pageHeading = this.headerText;
  async aboutYouUseInfoWithoutRiskYesAnswer() { await this.answerYesNoUnknown('Yes'); }
  async aboutYouUseInfoWithoutRiskNoAnswer() { await this.answerYesNoUnknown('No'); }
}


