/**
 * Production Environment Configuration
 * Limited to smoke tests only
 */
export const productionConfig = {
  baseURL: process.env.PROD_URL || 'https://production.example.com',
  apiURL: process.env.PROD_API_URL || 'https://api.production.example.com',
  timeout: 60000,
  retries: 3,
  workers: 2,
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  // Read-only mode for production
  readOnly: true,
  // Only smoke tests allowed
  allowedTestTypes: ['smoke'],
  features: {
    enabledFeatures: ['feature1', 'feature2', 'feature3'],
    disabledFeatures: [],
  },
};
