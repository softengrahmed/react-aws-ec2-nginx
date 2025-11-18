import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { HeaderComponent } from '../../page-objects/components/header-component';
import testData from '../../fixtures/test-data.json';

test.describe('Home Page Tests', () => {
  let homePage: HomePage;
  let headerComponent: HeaderComponent;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    headerComponent = new HeaderComponent(page);
    await homePage.navigateToHome();
  });

  test('should display the home page with correct title', async ({ page }) => {
    // Assert that the page title is correct
    await expect(page).toHaveTitle(testData.homePageData.expectedTitle);
  });

  test('should display the React logo', async () => {
    // Assert that the React logo is visible
    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBeTruthy();
  });

  test('should display the correct header text', async () => {
    // Assert that the header text is correct
    const headerText = await homePage.getHeaderText();
    expect(headerText).toContain(testData.homePageData.expectedHeaderText);
  });

  test('should have a working "Learn React" link', async () => {
    // Get the URL of the "Learn React" link
    const linkUrl = await homePage.getLearnReactLinkUrl();
    
    // Assert that the link URL is correct
    expect(linkUrl).toBe(testData.homePageData.expectedLinkUrl);
  });

  test('should have a visible header component', async () => {
    // Assert that the header component is visible
    const isHeaderVisible = await headerComponent.isHeaderVisible();
    expect(isHeaderVisible).toBeTruthy();
  });

  test('should have matching header text in component and page', async () => {
    // Get the header text from both the page and component
    const pageHeaderText = await homePage.getHeaderText();
    const componentHeaderText = await headerComponent.getHeaderText();
    
    // Assert that they match
    expect(pageHeaderText).toBe(componentHeaderText);
  });
});
