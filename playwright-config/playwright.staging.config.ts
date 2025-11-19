import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

/**
 * Staging Environment Configuration
 * Extends base config with staging-specific settings
 */
export default defineConfig({
  ...baseConfig,
  
  use: {
    ...baseConfig.use,
    baseURL: process.env.STAGING_URL || 'https://staging.example.com',
  },
  
  /* Disable web server for staging */
  webServer: undefined,
  
  /* More retries in staging */
  retries: 2,
  
  /* Staging-specific projects */
  projects: [
    {
      name: 'staging-chromium',
      use: { 
        ...baseConfig.projects![0].use,
        baseURL: process.env.STAGING_URL || 'https://staging.example.com',
      },
    },
    {
      name: 'staging-firefox',
      use: { 
        ...baseConfig.projects![1].use,
        baseURL: process.env.STAGING_URL || 'https://staging.example.com',
      },
    },
  ],
});