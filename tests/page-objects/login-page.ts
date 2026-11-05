import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"][id="userEmail"], input[type="email"]').first();
    this.passwordInput = page.locator('input[type="password"][id="userPassword"], input[type="password"]').first();
    this.loginButton = page.locator('input[type="submit"][value="Login"]').first();
    this.forgotPasswordLink = page.locator('a[href="#/auth/password-new"]').first();
    this.registerLink = page.locator('a[href="#/auth/register"]').first();
  }

  async open() {
    await this.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await this.expectLoginFormVisible();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickRegister() {
    await this.registerLink.click();
  }

  async expectLoginFormVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
