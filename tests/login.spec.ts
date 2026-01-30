import { test, expect } from './fixtures';
import { USER } from '../config/baseConfig';

test(
  'Verify login with valid credentials (UI)',
  { tag: '@regression' },
  async ({ page, app }) => {

    // 🚫 Skip in CI because Cloudflare blocks UI login
    test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');

    await page.goto('/auth/login');

    await app.loginPage.performLogin(USER.email, USER.password);

    // ✅ basic sanity checks (local only)
    await expect(page).toHaveURL(/\/account/);

    // optional UI checks (only local)
    await expect(page.getByTestId('nav-menu')).toBeVisible();

    // якщо реально показується імʼя
    await expect(page.getByTestId('nav-menu')).toContainText(USER.fullName);
  }
);
