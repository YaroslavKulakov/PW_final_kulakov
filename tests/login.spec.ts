import { test, expect } from '@playwright/test';
import { App } from '../Pages/App';

test.use({
  storageState: { cookies: [], origins: [] }, // затирає storageState з config
});

test('Verify login with valid credentials (UI)', async ({ page }) => {
  const app = new App(page);

  await page.goto('/auth/login');

  await app.loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
  await app.accountPage.expectUserLoggedIn('Jane Doe');

  await expect(page.getByText('Jane Doe')).toBeVisible();
});
