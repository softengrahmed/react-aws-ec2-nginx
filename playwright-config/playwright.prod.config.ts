import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

/**
 * Production Environment Configuration
 * Extends base config with production smoke test settings
 * Limited scope, read-only operations only
 */
export default defineConfig({
  ...baseConfig,
  
  /* Only run smoke tests in production */
  testDir: '../tests/e2e/smoke',
  
  use: {
    ...baseConfig.use,
    baseURL: process.env.PROD_URL || 'https://production.example.com',
  },
  
  /* Disable web server for production */
  webServer: undefined,
  
  /* Conservative settings for production */
  retries: 3,
  workers: 2,
  timeout: 60 * 1000,
  
  /* Production-specific projects - Chromium only */
  projects: [
    {
      name: 'prod-chromium',
      use: { 
        ...baseConfig.projects![0].use,
        baseURL: process.env.PROD_URL || 'https://production.example.com',
      },
    },
  ],
});