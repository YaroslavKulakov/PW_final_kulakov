import { test, expect } from './fixtures';
import { USER } from '../config/baseConfig';

test('Verify login with valid credentials (UI) @regression', async ({ page, app }) => {
  await page.goto('/auth/login');

  await app.loginPage.performLogin(USER.email, USER.password);

  // ✅ stable checks (CI-friendly)
  await expect(page).toHaveURL(/\/account/);
  await expect(page.getByTestId('page-title')).toHaveText(/my account/i);

  // ✅ optional: if name is really shown in nav menu
  await expect(page.getByTestId('nav-menu')).toBeVisible();
  // await expect(page.getByTestId('nav-menu')).toContainText(USER.fullName, { timeout: 15000 });
});
