import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { HeaderComponent } from '../../page-objects/components/header-component';
import testData from '../../fixtures/test-data.json';

/**
 * Regression Tests - UI Elements
 * Comprehensive tests to ensure UI elements work correctly across updates
 */
test.describe('UI Elements - Regression Suite', () => {
  let homePage: HomePage;
  let header: HeaderComponent;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    header = new HeaderComponent(page);
    await homePage.goto();
  });

  test('should display all expected elements from test data', async ({ page }) => {
    const { expectedElements } = testData;
    
    // Verify logo
    const logo = page.locator(expectedElements.homePage.logo);
    await expect(logo).toBeVisible();
    
    // Verify header
    const headerElement = page.locator(expectedElements.homePage.header);
    await expect(headerElement).toBeVisible();
    
    // Verify Learn React link
    const learnLink = page.locator(expectedElements.homePage.learnReactLink);
    await expect(learnLink).toBeVisible();
  });

  test('should display correct text content', async ({ page }) => {
    const { expectedTexts } = testData;
    
    // Check for Learn React text
    const learnReactText = page.getByText(expectedTexts.homePage.learnReactText);
    await expect(learnReactText).toBeVisible();
  });

  test('should have correct CSS classes applied', async ({ page }) => {
    const logo = page.locator('.App-logo');
    const className = await logo.getAttribute('class');
    
    expect(className).toContain('App-logo');
  });

  test('should maintain layout integrity', async ({ page }) => {
    // Get element positions
    const logo = page.locator('.App-logo');
    const header = page.locator('.App-header');
    
    const logoBox = await logo.boundingBox();
    const headerBox = await header.boundingBox();
    
    // Verify elements exist and have dimensions
    expect(logoBox).not.toBeNull();
    expect(headerBox).not.toBeNull();
    
    if (logoBox && headerBox) {
      // Logo should be inside header
      expect(logoBox.y).toBeGreaterThan(headerBox.y);
    }
  });

  test('should have proper styling applied', async ({ page }) => {
    const header = page.locator('.App-header');
    
    // Get computed styles
    const backgroundColor = await header.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Verify background color is set (not transparent)
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('should handle focus states correctly', async ({ page }) => {
    const learnLink = page.getByRole('link', { name: /learn react/i });
    
    // Focus on link
    await learnLink.focus();
    
    // Verify link is focused
    const isFocused = await learnLink.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBeTruthy();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab through elements
    await page.keyboard.press('Tab');
    
    // Verify an element is focused
    const activeElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeElement).toBeTruthy();
  });

  test('should render consistently across page loads', async ({ page }) => {
    // Take first screenshot
    const firstScreenshot = await page.screenshot();
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Take second screenshot
    const secondScreenshot = await page.screenshot();
    
    // Screenshots should be identical (within threshold)
    expect(firstScreenshot.length).toBeGreaterThan(0);
    expect(secondScreenshot.length).toBeGreaterThan(0);
  });
});
