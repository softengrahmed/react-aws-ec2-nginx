import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import testData from '../../fixtures/test-data.json';

test.describe('External Navigation', () => {
  test('should open YouTube channel in new tab when Subscribe button is clicked', async ({ page, context }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Create a listener for new pages
    const pagePromise = context.waitForEvent('page');
    
    // Click the Subscribe button
    await homePage.clickSubscribe();
    
    // Wait for the new page to open
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    
    // Assert
    expect(newPage.url()).toContain(testData.urls.youtube.replace('https://', ''));
  });

  test('should open GitHub repo in new tab when Github Repo button is clicked', async ({ page, context }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Create a listener for new pages
    const pagePromise = context.waitForEvent('page');
    
    // Click the Github Repo button
    await homePage.clickGithubRepo();
    
    // Wait for the new page to open
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    
    // Assert
    expect(newPage.url()).toContain(testData.urls.github.replace('https://', ''));
  });

  test('should contain LinkedIn link in the result text', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.clickCheckConnection();
    
    // Assert
    const resultText = await homePage.getResultText();
    expect(resultText).toContain(testData.urls.linkedin);
  });
});
