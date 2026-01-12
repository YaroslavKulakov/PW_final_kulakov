import { test } from './fixtures';

// eslint-disable-next-line playwright/expect-expect
test.skip('Verify login with valid credentials', async ({ app }) => {
  await app.homePage.goto();
  await app.homePage.header.openLogin();

  await app.loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

  await app.accountPage.expectUserLoggedIn('Jane Doe');
});
