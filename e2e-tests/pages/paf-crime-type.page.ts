import { basePage } from './base-page';

export class pafCrimeTypePage extends basePage {
  readonly expectedPageTitle = 'What is the crime you are reporting?';
  readonly pageHeading = this.headerText;

  async answerCrimeType(crimeType: string) {
    await this.assertPageTitle(this.expectedPageTitle);

    switch (crimeType) {
      case 'Immigration all':
        await this.answerImmigrationCrime();
        await this.answerNoPermissionToStayInTheUk();
        await this.answerIllegalWorking();
        await this.answerEmployerEmployingIllegalWorkers();
        await this.answerStudentWorkingFullTime();
        await this.answerFakeMarriage();
        await this.answerFakeOrFalseDocuments();
        await this.answerHelpingPeopleToEnterOrStayInTheUkIllegally();
        await this.answerLiedOnApplication();
        await this.answerHumanTraffickingSmugglingSlavery();
        await this.answerOtherImmigrationCrimes();
        break;
      case 'Smuggling all':
        await this.answerSmuggling();
        await this.answerDrugSmuggling();
        await this.answerCashSmuggling();
        await this.answerCigaretteAndTobaccoSmuggling();
        await this.answerFirearmsSmuggling();
        await this.answerAlcoholSmuggling();
        await this.answerOtherSmuggling();
        break;
      case 'Immigration Crime - Illegal workers, Lied on application, Other immigration crimes':
        await this.answerImmigrationCrime();
        await this.answerEmployerEmployingIllegalWorkers();
        await this.answerLiedOnApplication();
        await this.answerOtherImmigrationCrimes();
        break;
      default:
        throw new Error(`Crime type not understood: ${crimeType}`);
    }

    await this.clickContinueButton();
  }

  async answerImmigrationCrime() {
    await this.selectByLabel('Immigration Crime');
  }
  async answerSmuggling() {
    await this.selectByLabel('Smuggling');
  }
  async answerNoPermissionToStayInTheUk() {
    await this.selectByLabel('No permission to stay in the UK');
  }
  async answerIllegalWorking() {
    await this.selectByLabel('Illegal working');
  }
  async answerEmployerEmployingIllegalWorkers() {
    await this.selectByLabel('Employer employing illegal workers');
  }
  async answerStudentWorkingFullTime() {
    await this.selectByLabel('Student working full time');
  }
  async answerFakeMarriage() {
    await this.selectByLabel('Fake marriage');
  }
  async answerFakeOrFalseDocuments() {
    await this.selectByLabel('Fake or false documents');
  }
  async answerHelpingPeopleToEnterOrStayInTheUkIllegally() {
    await this.selectByLabel('Helping people to enter or stay in the UK illegally');
  }
  async answerLiedOnApplication() {
    await this.selectByLabel('Lied on application');
  }
  async answerHumanTraffickingSmugglingSlavery() {
    await this.selectByLabel('Human trafficking / smuggling / slavery');
  }
  async answerOtherImmigrationCrimes() {
    await this.selectByLabel('Other immigration crimes');
  }
  async answerDrugSmuggling() {
    await this.selectByLabel('Drug smuggling');
  }
  async answerCashSmuggling() {
    await this.selectByLabel('Cash smuggling');
  }
  async answerCigaretteAndTobaccoSmuggling() {
    await this.selectByLabel('Cigarette and tobacco smuggling');
  }
  async answerFirearmsSmuggling() {
    await this.selectByLabel('Firearms smuggling');
  }
  async answerAlcoholSmuggling() {
    await this.selectByLabel('Alcohol smuggling');
  }
  async answerOtherSmuggling() {
    await this.selectByLabel('Other smuggling');
  }
}
