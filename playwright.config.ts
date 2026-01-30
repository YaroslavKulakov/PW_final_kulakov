import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './config/baseConfig';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,


  use: {
    baseURL: BASE_URL,
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    // 🔹 auth / setup (якщо реально використовуєш)
    {
      name: 'auth',
      testMatch: /.*\.auth\.login\.spec\.ts/,
    },

    // 🔹 smoke
    {
      name: 'smoke',
      grep: /@smoke/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // 🔹 regression
    {
      name: 'regression',
      grep: /@regression/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // 🔹 full cross-browser (опційно)
    {
      name: 'chromium',
      dependencies: ['auth'],
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      dependencies: ['auth'],
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      dependencies: ['auth'],
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
