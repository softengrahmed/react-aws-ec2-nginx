import { chromium, FullConfig } from '@playwright/test';

/**
 * Global setup runs once before all tests
 * Use for application-wide setup tasks
 */
async function globalSetup(config: FullConfig): Promise<void> {
  console.log('\n🚀 Starting Global Test Setup...');
  
  const baseURL = config.use?.baseURL || 'http://localhost:3000';
  console.log(`📍 Base URL: ${baseURL}`);
  
  // Launch browser to check if application is accessible
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('🌐 Verifying application accessibility...');
    await page.goto(baseURL, { timeout: 30000, waitUntil: 'networkidle' });
    console.log('✅ Application is accessible');
  } catch (error) {
    console.error('❌ Application is not accessible:', error);
    throw error;
  } finally {
    await browser.close();
  }
  
  // Set up test data or environment variables if needed
  process.env.TEST_RUN_ID = `test-run-${Date.now()}`;
  console.log(`🔖 Test Run ID: ${process.env.TEST_RUN_ID}`);
  
  console.log('✅ Global Setup Complete\n');
}

export default globalSetup;
