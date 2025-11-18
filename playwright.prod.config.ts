import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

/**
 * Production environment configuration for Playwright tests
 */
export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: process.env.PRODUCTION_URL || 'https://production-app-url.com',
  },
  webServer: undefined, // Don't start local server for production tests
  
  // Only run smoke tests in production
  testDir: './tests/features/smoke',
});
