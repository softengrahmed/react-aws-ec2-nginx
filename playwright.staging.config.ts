import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

/**
 * Staging environment configuration for Playwright tests
 */
export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: process.env.STAGING_URL || 'https://staging-app-url.com',
  },
  webServer: undefined, // Don't start local server for staging tests
});
