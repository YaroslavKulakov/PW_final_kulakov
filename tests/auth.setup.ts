import { test as setup } from '@playwright/test';
import { LoginPage } from '../Pages/Login.page';
import { AccountPage } from '../Pages/Account.page';

const authFile = 'playwright/.auth/user.json';

setup('login via UI and save storage state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await page.goto('/auth/login');

  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
  await accountPage.expectUserLoggedIn('Jane Doe');

  await page.context().storageState({ path: authFile });
});

