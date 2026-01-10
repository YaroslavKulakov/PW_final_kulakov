// tests/auth.login.spec.ts
import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('login via UI and save storage state', async ({ page }) => {
  const { LoginPage } = await import('../Pages/Login.page');
  const { AccountPage } = await import('../Pages/Account.page');

  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  // 1. Open login page directly (baseURL + path)
  await page.goto('/auth/login');

  // 2. Perform login
  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

  // 3. Verify login success
  await accountPage.expectUserLoggedIn('Jane Doe');

  // 4. Save storage state
  await page.context().storageState({ path: authFile });
});

