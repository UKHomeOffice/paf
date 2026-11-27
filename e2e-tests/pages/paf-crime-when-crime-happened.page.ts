import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafCrimeWhenCrimeHappenedPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: When is the crime happening? – GOV.UK"
      : "When is the crime happening? – GOV.UK";
  }

  async answerWhenCrimeHappens(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());

    switch (value) {
      case 'Happening now':
        await this.selectByLabel('Happening now');
        await this.fillIfPresent('happening-now-info', c.TEXT);
        return this.clickContinueButton();
      case 'Ongoing':
        await this.selectByLabel('Ongoing');
        await this.fillIfPresent('ongoing-info', c.TEXT);
        return this.clickContinueButton();
      case 'Already happened':
        await this.selectByLabel('Already happened');
        await this.fillIfPresent('already-happened-info', c.TEXT);
        return this.clickContinueButton();
      case 'Not yet happened':
        return await this.selectAndContinue('Not yet happened');
      case "I don't know":
        return await this.selectAndContinue("I don't know");
      default:
        throw new Error(`Invalid when crime happened: ${value}`);
    }
  }
}
