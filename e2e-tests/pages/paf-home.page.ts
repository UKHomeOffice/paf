import { basePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class pafHomePage extends basePage {
  readonly expectedPageTitle = 'Report an immigration or customs crime';
  readonly pageHeading = this.headerText;
  readonly startNowButton: Locator;
  readonly acceptCookiesButton: Locator;
  readonly hideCookiesMessageButton: Locator;

  constructor(page: Page) {
    super(page);
    this.startNowButton = page.getByRole('button', { name: 'Start now' }).or(page.getByRole('link', { name: 'Start now' })).or(page.locator('input[value="Start now"]'));
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept additional cookies' }).or(page.locator('#accept-cookies-button'));
    this.hideCookiesMessageButton = page.getByRole('button', { name: 'Hide this message' }).or(page.locator('#hide-accept-cookie-banner'));
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
    await this.assertPageTitle(this.expectedPageTitle);
    await this.startNowButton.click();
  }
}


