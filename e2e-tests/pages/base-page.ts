import { expect, Locator, Page } from '@playwright/test';

export class basePage {
  readonly page: Page;
  readonly headerText: Locator;
  readonly continueButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerText = page.locator('h1');
    this.continueButton = page.getByRole('button', { name: /^(Continue|Save and continue)$/ }).or(page.locator("input[value='Continue'], input[value='Save and continue']"));
    this.submitButton = page.getByRole('button', { name: /^(Submit|Confirm submission)$/ }).or(page.locator("input[value='Submit'], input[value='Confirm submission']"));
  }

  async assertPageTitle(expectedTitle: string) {
    await expect(this.headerText).toContainText(expectedTitle);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async selectByLabel(label: string) {
    const roleOption = this.page.getByRole('radio', { name: label, exact: true }).or(this.page.getByRole('checkbox', { name: label, exact: true }));

    if (await roleOption.count()) {
      await roleOption.first().click();
      return;
    }

    await this.page.getByLabel(label, { exact: true }).or(this.page.getByText(label, { exact: true })).first().click();
  }

  async selectAndContinue(label: string) {
    await this.selectByLabel(label);
    await this.clickContinueButton();
  }

  async answerYesNoUnknown(value: string) {
    const normalizedValue = value.trim().toLowerCase();
    const label = normalizedValue === 'yes' ? 'Yes' : normalizedValue === 'no' ? 'No' : "I don't know";

    await this.selectAndContinue(label);
  }

  async fillById(id: string, value: string) {
    await this.page.locator(`#${id}`).fill(value);
  }

  async fillIfPresent(id: string, value: string) {
    const field = this.page.locator(`#${id}`);

    if (await field.count()) {
      await field.fill(value);
    }
  }

  async fillMany(ids: string[], value: string = 'Text') {
    for (const id of ids) {
      await this.fillIfPresent(id, value);
    }
  }

  async enterDateByLegend(legend: string, value: string = '01/01/1980') {
    const [day, month, year] = value.split('/');
    const group = this.page.getByRole('group', { name: legend });

    await group.getByLabel('Day').fill(day);
    await group.getByLabel('Month').fill(month);
    await group.getByLabel('Year').fill(year);
  }

  async fillDateByPrefix(prefix: string, value: string = '01/01/1980') {
    const [day, month, year] = value.split('/');

    await this.fillIfPresent(`${prefix}-day`, day);
    await this.fillIfPresent(`${prefix}-month`, month);
    await this.fillIfPresent(`${prefix}-year`, year);
  }

  async autocompleteById(id: string, value: string) {
    await this.fillIfPresent(id, value);
    await this.page.keyboard.press('Tab');
  }

  async completeTextPage(ids: string[], value: string = 'Text') {
    await this.fillMany(ids, value);
    await this.clickContinueButton();
  }
}