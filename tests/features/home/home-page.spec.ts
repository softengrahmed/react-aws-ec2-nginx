import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { HeaderComponent } from '../../page-objects/components/header-component';
import testData from '../../fixtures/test-data.json';

test.describe('Home Page Tests', () => {
  test('should display the correct title and header', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const headerComponent = new HeaderComponent(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    await expect(page).toHaveTitle(expect.stringContaining('React App'));
    await expect(headerComponent.title).toBeVisible();
    
    const titleText = await headerComponent.getTitleText();
    expect(titleText).toContain(testData.appTitle);
    
    const channelName = await headerComponent.getChannelName();
    expect(channelName).toBe(testData.channelName);
  });

  test('should display the YouTube video iframe', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    const hasVideo = await homePage.hasYoutubeVideo();
    expect(hasVideo).toBeTruthy();
    
    // Check that the iframe has the correct YouTube URL
    await expect(page.locator('iframe[src*="youtube.com"]')).toBeVisible();
  });

  test('should display AWS EC2 text', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    await expect(page.locator(`p:has-text("${testData.expectedTexts.awsText}")`)).toBeVisible();
  });

  test('should show LinkedIn connection game section', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    await expect(page.locator('h2:text("LinkedIn Connection Game")')).toBeVisible();
    await expect(page.locator(`p:text("${testData.expectedTexts.connectionQuestion}")`)).toBeVisible();
    await expect(page.locator('button:text("Check Connection")')).toBeVisible();
  });

  test('should show result when checking LinkedIn connection', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.clickCheckConnection();
    
    // Assert
    const result = await homePage.getConnectionResult();
    expect(result).not.toBeNull();
    expect(result?.length).toBeGreaterThan(0);
  });

  test('should have working buttons with correct links', async ({ page, context }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert - Check that buttons exist
    await expect(page.locator('button:text("Subscribe to my channel")')).toBeVisible();
    await expect(page.locator('button:text("Github Repo")')).toBeVisible();
    
    // Test Subscribe button - will open a new page
    const subscribePromise = context.waitForEvent('page');
    await homePage.clickSubscribe();
    const subscribePage = await subscribePromise;
    await subscribePage.waitForLoadState();
    expect(subscribePage.url()).toContain(testData.urls.youtube);
    
    // Test Github Repo button - will open a new page
    const githubPromise = context.waitForEvent('page');
    await homePage.clickGithubRepo();
    const githubPage = await githubPromise;
    await githubPage.waitForLoadState();
    expect(githubPage.url()).toContain(testData.urls.github);
  });

  test('should display the correct footer', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    const footerText = await homePage.getFooterText();
    expect(footerText).toContain(testData.expectedTexts.footerYear);
    expect(footerText).toContain(testData.channelName);
  });
});
