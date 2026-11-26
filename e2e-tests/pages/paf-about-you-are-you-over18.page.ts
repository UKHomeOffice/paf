import { basePage } from './base-page';

export class pafAboutYouAreYouOver18Page extends basePage {
  readonly pageHeading = this.headerText;

  	async expectedPageTitle(): Promise<string> {
		const title = await this.page.title();

		return title.startsWith('Error')
			? "Error: Are you over 18? – GOV.UK"
			: "Are you over 18? – GOV.UK";
	}

  async answerAboutYouOver18(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    if (value.trim().toLowerCase() === 'yes') {
      await this.aboutYouOver18YesAnswer();
    } else {
      await this.aboutYouOver18NoAnswer();
    }
  }

  async aboutYouOver18YesAnswer() {
    await this.answerYesNoUnknown('Yes');
  }
  async aboutYouOver18NoAnswer() {
    await this.answerYesNoUnknown('No');
  }
}
