import testData from '../../fixtures/test-data.json';

/**
 * Production environment configuration
 */
export const productionConfig = {
  baseUrl: testData.environments.production.baseUrl,
  credentials: {
    username: process.env.PRODUCTION_USERNAME || 'prod-user',
    password: process.env.PRODUCTION_PASSWORD || 'prod-password',
  },
  apiBaseUrl: process.env.PRODUCTION_API_URL || 'https://api.production-app-url.com',
  timeouts: {
    defaultTimeout: 45000,
    navigationTimeout: 60000,
  },
};

export default productionConfig;
