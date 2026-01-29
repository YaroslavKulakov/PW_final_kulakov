import { test, expect } from '@playwright/test';
import { App } from '../Pages/App';
import { USER } from '../config/baseConfig';

test.use({
  storageState: { cookies: [], origins: [] }, // затирає storageState з config
});

test('Verify login with valid credentials (UI)', async ({ page }) => {
  const app = new App(page);

  await page.goto('/auth/login');

  await app.loginPage.performLogin(USER.email, USER.password);
  await app.accountPage.expectUserLoggedIn(USER.fullName);

  await expect(page.getByText(USER.fullName)).toBeVisible();
});

