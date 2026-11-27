import { basePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class pafHomePage extends basePage {

  readonly startNowButton: Locator;
  readonly acceptCookiesButton: Locator;
  readonly hideCookiesMessageButton: Locator;

  constructor(page: Page) {
    super(page);
    this.startNowButton = page.getByRole('button', { name: 'Start now' })
      .or(page.getByRole('link', { name: 'Start now' }))
      .or(page.locator('input[value="Start now"]'));

    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept additional cookies' })
      .or(page.locator('#accept-cookies-button'));
      
    this.hideCookiesMessageButton = page.getByRole('button', { name: 'Hide this message' })
      .or(page.locator('#hide-accept-cookie-banner'));
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Report an immigration or customs crime – Public Allegations Form – GOV.UK"
      : "Report an immigration or customs crime – Public Allegations Form – GOV.UK";
  }

  async openPaf() {
    await this.page.goto('/');
    await this.acceptCookies();
  }

  async acceptCookies() {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }

    if (await this.hideCookiesMessageButton.isVisible()) {
      await this.hideCookiesMessageButton.click();
    }
  }

  async start() {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.startNowButton.click();
  }
}
