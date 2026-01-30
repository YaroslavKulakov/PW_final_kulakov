import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './config/baseConfig';

const authFile = 'playwright/.auth/user.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: BASE_URL,
    testIdAttribute: 'data-test',
    viewport: { width: 1440, height: 900 },
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },

  projects: [
    // ✅ Setup project: runs first and saves storageState to authFile
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // ✅ Smoke (Chromium only)
    {
      name: 'smoke',
      grep: /@smoke/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },

    // ✅ Regression (Chromium only)
    {
      name: 'regression',
      grep: /@regression/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },

    // ✅ Optional: keep full cross-browser suite (no tag filter)
    // Run: npx playwright test --project=chromium|firefox|webkit
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },

    {
      name: 'firefox',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: authFile,
      },
    },

    {
      name: 'webkit',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Safari'],
        storageState: authFile,
      },
    },
  ],
});
