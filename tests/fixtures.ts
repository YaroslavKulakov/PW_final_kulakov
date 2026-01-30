import { test as base, expect, type BrowserContext } from '@playwright/test';
import path from 'path';
import { App } from '../Pages/App';
import { USER } from '../config/baseConfig';
import { loginApi } from '../api/auth.api';

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

type Fixtures = {
  app: App;
  loggedInApp: App;
  loggedInAppStorage: App;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use(new App(page));
  },

  loggedInApp: async ({ page, request }, use) => {
    const token = await loginApi(request, USER.email, USER.password);

    await page.addInitScript((t: string) => {
      window.localStorage.setItem('auth-token', t);
    }, token);

    await use(new App(page));
  },

  loggedInAppStorage: async ({ browser }, use) => {
    const context: BrowserContext = await browser.newContext({
      storageState: authFile,
    });

    const page = await context.newPage();
    await use(new App(page));
    await context.close();
  },
});

export { expect };
