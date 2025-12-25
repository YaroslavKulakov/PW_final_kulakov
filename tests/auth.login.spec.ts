// tests/auth.login.spec.ts
import { test as setup} from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('login via UI and save storage state', async ({ page }) => {
  const { HomePage } = await import('../Pages/Home.page');
  const { LoginPage } = await import('../Pages/Login.page');
  const { AccountPage } = await import('../Pages/Account.page');

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  // 1. Відкрити головну сторінку
  await homePage.goto();

  // 2. Перейти на логін
   await homePage.header.openLogin();

  // 3. Виконати логін
  await loginPage.performLogin(
    'customer@practicesoftwaretesting.com',
    'welcome01'
  );

  // 4. Переконатися, що логін успішний
  await accountPage.expectUserLoggedIn('Jane Doe');

  // 5. Зберегти сесію у файл
  await page.context().storageState({ path: authFile });
});
