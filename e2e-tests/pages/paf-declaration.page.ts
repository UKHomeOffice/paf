import { basePage } from './base-page';
import { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class pafDeclarationPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Declaration – GOV.UK"
      : "Declaration – GOV.UK";
  }
  readonly pageHeading = this.headerText;
  async submitApplication() {
    await this.clickSubmitButton();
  }
  async assertApplicationSuccessful() {
    await expect(this.page.locator('body')).toContainText('Application successful');
  }
}
