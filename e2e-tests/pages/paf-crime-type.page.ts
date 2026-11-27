import { basePage } from './base-page';

export class pafCrimeTypePage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: What is the crime you are reporting? – GOV.UK"
      : "What is the crime you are reporting? – GOV.UK";
  }

  async answerCrimeType(crimeType: string) {
    await this.assertPageTitle(await this.expectedPageTitle());

    switch (crimeType) {
      case 'Immigration all':
        await this.selectByLabel('Immigration Crime');
        await this.selectByLabel('No permission to stay in the UK');
        await this.selectByLabel('Illegal working');
        await this.selectByLabel('Employer employing illegal workers');
        await this.selectByLabel('Student working full time');
        await this.selectByLabel('Fake marriage');
        await this.selectByLabel('Fake or false documents');
        await this.selectByLabel('Helping people to enter or stay in the UK illegally');
        await this.selectByLabel('Lied on application');
        await this.selectByLabel('Human trafficking / smuggling / slavery');
        await this.selectByLabel('Other immigration crimes');
        break;
      case 'Smuggling all':
        await this.selectByLabel('Smuggling');
        await this.selectByLabel('Drug smuggling');
        await this.selectByLabel('Cash smuggling');
        await this.selectByLabel('Cigarette and tobacco smuggling');
        await this.selectByLabel('Firearms smuggling');
        await this.selectByLabel('Alcohol smuggling');
        await this.selectByLabel('Other smuggling');
        break;
      case 'Immigration Crime - Illegal workers, Lied on application, Other immigration crimes':
        await this.selectByLabel('Immigration Crime');
        await this.selectByLabel('Employer employing illegal workers');
        await this.selectByLabel('Lied on application');
        await this.selectByLabel('Other immigration crimes');
        break;
      default:
        throw new Error(`Crime type not understood: ${crimeType}`);
    }

    await this.clickContinueButton();
  }

}
