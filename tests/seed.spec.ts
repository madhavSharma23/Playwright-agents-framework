import { test, expect } from '@playwright/test';
import { credentials } from './test-data';
import { LoginPage } from './page-objects/login-page';
import { DashboardPage } from './page-objects/dashboard-page';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveURL(/#\/auth\/login/);
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(credentials.valid.email, credentials.valid.password);
    await expect(page).toHaveURL(/#\/dashboard\/dash/);
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.addFirstProductToCart();
    await dashboardPage.clickCart();
  });
});
