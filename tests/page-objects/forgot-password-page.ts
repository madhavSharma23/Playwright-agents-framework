import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ForgotPasswordPage extends BasePage {
  readonly emailInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly saveNewPasswordButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('email-malformed').first();
    this.newPasswordInput = page.locator('input[type="password"][id="userPassword"], input[placeholder="Passsword"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"][id="confirmPassword"], input[placeholder="Confirm Passsword"]').first();
    this.saveNewPasswordButton = page.locator('button[type="submit"], input[type="submit"][value="Save New Password"]').first();
  }

  async open() {
    await this.goto('https://rahulshettyacademy.com/client/#/auth/password-new');
    await this.expectForgotPasswordFormVisible();
  }

  async submit(email: string, password: string, confirmPassword: string) {
    await this.emailInput.fill(email);
    await this.newPasswordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.saveNewPasswordButton.click();
  }

  async expectForgotPasswordFormVisible() {
    await expect(this.page.getByRole('heading', { name: 'Enter New Password' })).toBeVisible();
    await expect(this.saveNewPasswordButton).toBeVisible();
  }
}
