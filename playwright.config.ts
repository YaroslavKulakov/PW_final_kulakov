import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './config/baseConfig';

const authFile = 'playwright/.auth/user.json';

export default defineConfig({
  testDir: './tests',

  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['dot'],
    ['html', { open: 'never' }],
  ],

  use: {
    baseURL: BASE_URL,
    testIdAttribute: 'data-test',
    ...devices['Desktop Chrome'],
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    // 1️⃣ setup
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // 2️⃣ smoke project
    {
      name: 'smoke',
      grep: /@smoke/,
      dependencies: ['setup'],
      use: {
        storageState: authFile,
      },
    },

    // 3️⃣ regression project
    {
      name: 'regression',
      grep: /@regression/,
      dependencies: ['setup'],
      use: {
        storageState: authFile,
      },
    },
  ],
});
