import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';

/**
 * Smoke Tests - Health Check
 * Quick verification that the application is accessible and basic functionality works
 */
test.describe('Application Health Check', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test
    await page.goto('/');
  });

  test('should load the application successfully', async ({ page }) => {
    // Verify page loads without errors
    await expect(page).toHaveTitle(/React App/);
    
    // Verify page is responsive
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('should display React logo', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Verify logo is visible
    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBeTruthy();
  });

  test('should display main header', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Verify header exists and is visible
    await homePage.assertPageLoaded();
  });

  test('should have Learn React link', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Verify Learn React link is present and has correct href
    const href = await homePage.getLearnReactLinkHref();
    expect(href).toContain('reactjs.org');
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    // Capture console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});
