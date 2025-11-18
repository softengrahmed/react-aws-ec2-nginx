import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { HeaderComponent } from '../../page-objects/components/header-component';
import { AssertionHelpers } from '../../helpers/assertion-helpers';

// Import test data
import testData from '../../fixtures/test-data.json';

test.describe('Home Page Tests', () => {
  let homePage: HomePage;
  let headerComponent: HeaderComponent;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    homePage = new HomePage(page);
    headerComponent = new HeaderComponent(page);

    // Navigate to home page
    await homePage.navigateToHome();
  });

  test('should display the React logo', async ({ page }) => {
    // Assert that the logo is visible
    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBeTruthy();
  });

  test('should display the correct header text', async ({ page }) => {
    // Get the header text and assert it matches the expected value
    const headerText = await homePage.getHeaderText();
    expect(headerText).toContain(testData.headerText);
  });

  test('should have a working "Learn React" link', async ({ page }) => {
    // Click on the "Learn React" link
    await homePage.clickLearnReactLink();

    // Assert that the URL has changed to the React documentation site
    await AssertionHelpers.assertUrlContains(page, 'reactjs.org');
  });

  test('should have the correct page title', async ({ page }) => {
    // Assert that the page title is correct
    await homePage.assertPageTitle(testData.appTitle);
  });

  test('should have a spinning logo', async ({ page }) => {
    // Check if the logo is spinning
    const isSpinning = await headerComponent.isLogoSpinning();
    expect(isSpinning).toBeTruthy();
  });
});
