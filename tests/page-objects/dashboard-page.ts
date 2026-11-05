import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class DashboardPage extends BasePage {
  readonly searchBox: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly addToCartButtons: Locator;
  readonly cartButton: Locator;
  readonly signOutButton: Locator;
  readonly priceMinInput: Locator;
  readonly priceMaxInput: Locator;
  readonly resultSummary: Locator;
  readonly nextPageButton: Locator;
  readonly previousPageButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBox = page.locator('input[placeholder="search"]:visible');
    this.productCards = page.locator('h5').locator('..').locator('..');
    this.productNames = page.locator('h5');
    this.addToCartButtons = page.getByRole('button', { name: /add to cart/i });
    this.cartButton = page.getByRole('button', { name: /cart/i }).first();
    this.signOutButton = page.getByRole('button', { name: /sign out/i });
    this.priceMinInput = page.locator('input[placeholder="Min Price"]:visible');
    this.priceMaxInput = page.locator('input[placeholder="Max Price"]:visible');
    this.resultSummary = page.locator('text=Showing');
    this.nextPageButton = page.getByText('Next').first();
    this.previousPageButton = page.getByText('Previous').first();
  }

  async open() {
    await this.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await this.expectDashboardVisible();
  }

  async expectDashboardVisible() {
    await expect(this.searchBox).toBeVisible();
    await expect(this.productNames.first()).toBeVisible();
    await expect(this.cartButton).toBeVisible();
  }

  async search(keyword: string) {
    await this.searchBox.fill(keyword);
    await this.searchBox.press('Enter');
  }

  async filterByPrice(minPrice: string, maxPrice: string) {
    await this.priceMinInput.fill(minPrice);
    await this.priceMaxInput.fill(maxPrice);
  }

  async selectCategoryByIndex(index: number) {
    const category = this.page.locator('input[type="checkbox"]:visible').nth(index);
    await category.check();
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async clickCart() {
    await this.cartButton.click();
  }

  async signOut() {
    await this.signOutButton.click();
  }
}
