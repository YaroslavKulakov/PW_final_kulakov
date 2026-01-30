import { test as setup} from '@playwright/test';
import { LoginPage } from '../Pages/Login.page';
import { AccountPage } from '../Pages/Account.page';
import { USER } from '../config/baseConfig';

const authFile = 'playwright/.auth/user.json';

setup('login via UI and save storage state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await page.goto('/auth/login');


  await loginPage.performLogin(USER.email, USER.password);
  await accountPage.expectUserLoggedIn(USER.fullName);

  await page.context().storageState({ path: authFile });
});



