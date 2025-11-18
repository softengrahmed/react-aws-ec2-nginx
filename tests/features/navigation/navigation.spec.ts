import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import testData from '../../fixtures/test-data.json';

test.describe('Navigation Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('should navigate to the home page', async () => {
    // Navigate to the home page
    await homePage.navigateToHome();
    
    // Assert that the page has loaded correctly
    const isPageLoaded = await homePage.isPageLoaded();
    expect(isPageLoaded).toBeTruthy();
  });

  test('should have the correct page title after navigation', async ({ page }) => {
    // Navigate to the home page
    await homePage.navigateToHome();
    
    // Assert that the page title is correct
    await expect(page).toHaveTitle(testData.homePageData.expectedTitle);
  });

  test('should have a working "Learn React" link with correct URL', async () => {
    // Navigate to the home page
    await homePage.navigateToHome();
    
    // Get the URL of the "Learn React" link
    const linkUrl = await homePage.getLearnReactLinkUrl();
    
    // Assert that the link URL is correct
    expect(linkUrl).toBe(testData.homePageData.expectedLinkUrl);
  });
});
