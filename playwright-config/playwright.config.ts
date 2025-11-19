import { defineConfig, devices } from '@playwright/test';

/**
 * Main Playwright Configuration
 * Supports multi-browser testing with parallel execution
 * Environment: Default (can be overridden with environment-specific configs)
 */
export default defineConfig({
  testDir: '../tests',
  
  /* Maximum time one test can run */
  timeout: 30 * 1000,
  
  /* Test execution settings */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  
  /* Reporter configuration */
  reporter: [
    ['html', { outputFolder: '../tests/reports/html-report' }],
    ['json', { outputFile: '../tests/reports/test-results.json' }],
    ['list'],
  ],
  
  /* Shared settings for all tests */
  use: {
    /* Base URL */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    /* Screenshot and video settings */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    /* Browser settings */
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    /* Action timeout */
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  /* Global setup and teardown */
  globalSetup: require.resolve('../tests/helpers/global-setup.ts'),
  globalTeardown: require.resolve('../tests/helpers/global-teardown.ts'),

  /* Output folder */
  outputDir: '../tests/test-results/',
  
  /* Web server configuration for local development */
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});