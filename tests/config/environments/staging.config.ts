import testData from '../../fixtures/test-data.json';

/**
 * Staging environment configuration
 */
export const stagingConfig = {
  baseUrl: testData.environments.staging.baseUrl,
  credentials: {
    username: process.env.STAGING_USERNAME || 'test-user',
    password: process.env.STAGING_PASSWORD || 'test-password',
  },
  apiBaseUrl: process.env.STAGING_API_URL || 'https://api.staging-app-url.com',
  timeouts: {
    defaultTimeout: 30000,
    navigationTimeout: 45000,
  },
};

export default stagingConfig;
