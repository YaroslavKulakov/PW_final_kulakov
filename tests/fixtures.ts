import { test as base, expect, BrowserContext } from '@playwright/test';
import path from 'path';
import { App } from '../Pages/App';

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

type Fixtures = {
  app: App;
  loggedInApp: App;
};

export const test = base.extend<Fixtures>({
  // неавторизований app
  app: async ({ page }, use) => {
    await use(new App(page));
  },

  // Авторизований app через storageState
  loggedInApp: async ({ browser }, use) => {
    const context: BrowserContext = await browser.newContext({
      storageState: authFile,
    });

    const page = await context.newPage();
    const app = new App(page);

    // перевірка, що справді залогінений
    await page.goto('/');
    await expect(page.getByText('Jane Doe')).toBeVisible();

    await use(app);

    await context.close();
  },
});

export { expect };
