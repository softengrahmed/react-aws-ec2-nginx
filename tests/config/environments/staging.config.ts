/**
 * Staging Environment Configuration
 */
export const stagingConfig = {
  baseURL: process.env.STAGING_URL || 'https://staging.example.com',
  apiURL: process.env.STAGING_API_URL || 'https://api.staging.example.com',
  timeout: 30000,
  retries: 2,
  workers: 4,
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  credentials: {
    username: process.env.STAGING_USERNAME || '',
    password: process.env.STAGING_PASSWORD || '',
  },
  features: {
    enabledFeatures: ['feature1', 'feature2'],
    disabledFeatures: [],
  },
};
