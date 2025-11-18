import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import testData from '../../fixtures/test-data.json';

test.describe('Home Page', () => {
  test('should display the correct header and footer', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    const headerText = await homePage.getHeaderText();
    const footerText = await homePage.getFooterText();
    
    expect(headerText).toContain(testData.texts.header);
    expect(footerText).toContain(testData.texts.footer);
  });

  test('should display the YouTube embed', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    const isYoutubeEmbedPresent = await homePage.isYoutubeEmbedPresent();
    expect(isYoutubeEmbedPresent).toBeTruthy();
  });

  test('should show LinkedIn connection result when button is clicked', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.clickCheckConnection();
    
    // Assert
    const resultText = await homePage.getResultText();
    expect(resultText).toContain(testData.texts.notConnected);
  });

  test('should have working buttons with correct text', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    await expect(homePage.checkConnectionButton).toHaveText(testData.buttons.checkConnection);
    await expect(homePage.subscribeButton).toHaveText(testData.buttons.subscribe);
    await expect(homePage.githubRepoButton).toHaveText(testData.buttons.githubRepo);
  });
});
