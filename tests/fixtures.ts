import { test as base, expect, type BrowserContext } from '@playwright/test';
import path from 'path';
import { App } from '../Pages/App';
import { testUser } from './utils/testUser';
import { loginApi } from '../api/auth.api';

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

type Fixtures = {
  app: App;
  loggedInApp: App; // via API login 
  loggedInAppStorage: App; //  via storageState 
};

export const test = base.extend<Fixtures>({
  // неавторизований app
  app: async ({ page }, use) => {
    await use(new App(page));
  },

  // Авторизований app через API login
  loggedInApp: async ({ page, request }, use) => {
    const token = await loginApi(request, testUser.email, testUser.password);

    // IMPORTANT: set localStorage BEFORE first page load
    await page.addInitScript((t: string) => {
      window.localStorage.setItem('auth-token', t);
    }, token);

    const app = new App(page);
    await use(app);
  },

  // Авторизований app через storageState 
  loggedInAppStorage: async ({ browser }, use) => {
    const context: BrowserContext = await browser.newContext({
      storageState: authFile,
    });

    const page = await context.newPage();
    const app = new App(page);

    await use(app);
    await context.close();
  },
});

export { expect };
