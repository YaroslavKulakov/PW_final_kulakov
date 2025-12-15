import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();

  // Verify URL is https://practicesoftwaretesting.com/account.
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

  // Verify page title is "My Account".
  await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');

  // Verify username "Jane Doe" appears in the navigation bar.
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');
});