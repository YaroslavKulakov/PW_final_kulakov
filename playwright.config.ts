import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './config/baseConfig';

const authFile = 'playwright/.auth/user.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,


  reporter: [
    ['dot'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results.json' }],
  ],

  use: {
    baseURL: BASE_URL,
    testIdAttribute: 'data-test',
    viewport: { width: 1440, height: 900 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    // Setup: створює storageState
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Tagged suites (Chromium only)
    // Запуск: npx playwright test --project=smoke
    {
      name: 'smoke',
      grep: /@smoke/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },

    // Запуск: npx playwright test --project=regression
    {
      name: 'regression',
      grep: /@regression/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },

    // Cross-browser suite (без тегів)
    // Запуск: npx playwright test --project=chromium (або firefox/webkit)
 
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
