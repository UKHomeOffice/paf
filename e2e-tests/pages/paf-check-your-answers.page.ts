import { basePage } from './base-page';

export class pafCheckYourAnswersPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Check your answers before submitting your application. – GOV.UK"
      : "Check your answers before submitting your application. – GOV.UK";
  }
  readonly pageHeading = this.headerText;
  readonly confirmSubmissionButton = this.page
    .getByRole('button', { name: 'Confirm submission' })
    .or(this.page.locator("input[value='Confirm submission']"));

  async clickConfirmSubmission() {
    await this.confirmSubmissionButton.click();
  }
}
