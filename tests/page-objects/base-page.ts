import { expect, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async expectUrlToContain(fragment: string) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }
}
