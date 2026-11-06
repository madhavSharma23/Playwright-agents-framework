import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login-page';
import { RegisterPage } from './page-objects/register-page';
import { ForgotPasswordPage } from './page-objects/forgot-password-page';
import { credentials } from './test-data';

test.describe('Authentication', () => {
  test('should log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(credentials.valid.email, credentials.valid.password);
    await expect(page).toHaveURL(/#\/dashboard\/dash/);
  });

  test('should reject blank login submission', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginButton.click();
    await expect(page).toHaveURL(/#\/auth\/login/);
  });

  test('should validate malformed email format', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    await loginPage.emailInput.fill(credentials.malformedEmail);
    await loginPage.passwordInput.fill(credentials.valid.password);
    await loginPage.loginButton.click();

    await expect(page).toHaveURL(/#\/auth\/login/);
    expect(await loginPage.emailInput.evaluate((element) => (element as HTMLInputElement).validity.valid)).toBeFalsy();
  });

  test('should keep user on login page for wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    await loginPage.emailInput.fill(credentials.invalid.email);
    await loginPage.passwordInput.fill(credentials.invalid.password);
    await loginPage.loginButton.click();

    await expect(page).toHaveURL(/#\/auth\/login/);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('should navigate to registration page from login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    await loginPage.open();
    await loginPage.clickRegister();
    await registerPage.expectRegisterFormVisible();
  });
});

test.describe('Account recovery', () => {
  test('should navigate to forgot password flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const forgotPasswordPage = new ForgotPasswordPage(page);

    await loginPage.open();
    await loginPage.clickForgotPassword();
    await forgotPasswordPage.expectForgotPasswordFormVisible();
  });

  test('should validate password reset form inputs', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);

    await forgotPasswordPage.open();
    await forgotPasswordPage.saveNewPasswordButton.click();
    await expect(page).toHaveURL(/#\/auth\/password-new/);

    await forgotPasswordPage.submit(credentials.reset.email, credentials.reset.password, credentials.reset.confirmPassword);
    await expect(page.locator('body')).toContainText(/password and confirm password must match/i);
  });
});
