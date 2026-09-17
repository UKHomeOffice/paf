import { basePage } from './base-page';

export class pafCheckYourAnswersPage extends basePage {
  readonly expectedPageTitle = 'Check your answers before submitting your application.';
  readonly pageHeading = this.headerText;
  readonly confirmSubmissionButton = this.page.getByRole('button', { name: 'Confirm submission' }).or(this.page.locator("input[value='Confirm submission']"));

  async checkYourAnswersAnswer() {
    await this.clickConfirmSubmission();
  }

  async clickConfirmSubmission() {
    await this.confirmSubmissionButton.click();
  }
}
