import fs from 'fs';
import path from 'path';
import { test as setup } from '@playwright/test';
import { BASE_URL, USER } from '../config/baseConfig';
import { loginApi } from '../api/auth.api';

const authFile = 'playwright/.auth/user.json';

setup('login via API and save storage state', async ({ page, request }) => {
  // ensure directory exists
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  // get token via API
  const token = await loginApi(request, USER.email, USER.password);

  // set token BEFORE first page load
  await page.addInitScript((t: string) => {
    window.localStorage.setItem('auth-token', t);
  }, token);

  // open app to persist storage state
  await page.goto(`${BASE_URL}/account`, { waitUntil: 'domcontentloaded' });

  // save storageState
  await page.context().storageState({ path: authFile });
});




