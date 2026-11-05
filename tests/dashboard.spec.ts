import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login-page';
import { DashboardPage } from './page-objects/dashboard-page';
import { credentials, dashboard } from './test-data';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(credentials.valid.email, credentials.valid.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectDashboardVisible();
  });

  test('loads the dashboard shell and product list', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(page).toHaveURL(/#\/dashboard\/dash/);
    await expect(dashboardPage.searchBox).toBeVisible();
    await expect(dashboardPage.productNames.first()).toBeVisible();
    await expect(dashboardPage.cartButton).toBeVisible();
    await expect(dashboardPage.signOutButton).toBeVisible();
  });

  test('filters products by keyword search', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.search(dashboard.search.keyword);

    await expect(dashboardPage.productNames).toHaveCount(1);
    await expect(dashboardPage.productNames.first()).toHaveText(/iphone 13 pro/i);
  });

  test('filters products by price range and category', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.filterByPrice(dashboard.price.min, dashboard.price.max);
    await dashboardPage.selectCategoryByIndex(dashboard.categories.electronics);

    await expect(dashboardPage.productNames.first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/iphone 13 pro/i);
  });

  test('adds a product to cart from the dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.addFirstProductToCart();
    await dashboardPage.clickCart();

    await expect(page).toHaveURL(/#\/dashboard\/cart|#\/dashboard\/dash/);
    await expect(page.locator('body')).toContainText(/cart|orders/i);
  });
});
