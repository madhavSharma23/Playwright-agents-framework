import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('input[placeholder="First Name"]').first();
    this.lastNameInput = page.locator('input[placeholder="Last Name"]').first();
    this.emailInput = page.locator('input[type="email"][placeholder="email@example.com"]').first();
    this.phoneInput = page.locator('input[placeholder="enter your number"]').first();
    this.passwordInput = page.locator('input[type="password"][formcontrolname="userPassword"]');
    this.confirmPasswordInput = page.locator('input[type="password"][formcontrolname="confirmPassword"]');
    this.registerButton = page.locator('input[type="submit"][value="Register"]').first();
  }

  async open() {
    await this.goto('https://rahulshettyacademy.com/client/#/auth/register');
    await this.expectRegisterFormVisible();
  }

  async expectRegisterFormVisible() {
    await expect(this.page.getByRole('heading', { name: 'Register' })).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
  }
}
