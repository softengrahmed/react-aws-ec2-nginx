import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import testData from '../../fixtures/test-data.json';

test.describe('Health Check', () => {
  test('should load the home page successfully', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    await expect(page).toHaveTitle(expect.stringContaining('React App'));
    
    // Check for key elements that indicate the page loaded correctly
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.App-logo')).toBeVisible();
    await expect(page.locator('iframe[src*="youtube.com"]')).toBeVisible();
    
    // Verify the header contains the expected text
    const headerText = await homePage.getHeaderTitle();
    expect(headerText).toContain(testData.appTitle);
  });

  test('should have all critical UI components visible', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert - Check that all critical UI components are visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.App-logo')).toBeVisible();
    await expect(page.locator('iframe[src*="youtube.com"]')).toBeVisible();
    await expect(page.locator('h2:text("LinkedIn Connection Game")')).toBeVisible();
    await expect(page.locator('button:text("Check Connection")')).toBeVisible();
    await expect(page.locator('button:text("Subscribe to my channel")')).toBeVisible();
    await expect(page.locator('button:text("Github Repo")')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have working LinkedIn connection check', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.clickCheckConnection();
    
    // Assert
    const result = await homePage.getConnectionResult();
    expect(result).not.toBeNull();
    // The result should contain either "Yes" or "No" based on the random check
    expect(result).toMatch(/Yes|No/);
  });
});
