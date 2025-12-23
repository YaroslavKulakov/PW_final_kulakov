import { test } from '@playwright/test';
import { HomePage } from '../Pages/Home.page';
import { LoginPage } from '../Pages/Login.page';
import { AccountPage } from '../Pages/Account.page';


// eslint-disable-next-line playwright/expect-expect
test('Verify login with valid credentials', async ({ page }) => {
  
  test.skip(process.env.CI === 'true', 'Skip test on CI');
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await homePage.goto();
  await homePage.header.openLogin();

  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

  await accountPage.expectUserLoggedIn('Jane Doe');
});