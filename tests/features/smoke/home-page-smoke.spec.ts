import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { HeaderComponent } from '../../page-objects/components/header-component';
import testData from '../../fixtures/test-data.json';

test.describe('Home Page Smoke Tests', () => {
  test('should load home page successfully', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    const title = await homePage.getTitle();
    expect(title).toContain('React App');
  });

  test('should display correct header text', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const headerComponent = new HeaderComponent(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    const headerText = await headerComponent.getTitleText();
    expect(headerText).toContain(testData.app.title);
  });

  test('should display YouTube embed', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    const isYoutubePresent = await homePage.isYoutubeEmbedPresent();
    expect(isYoutubePresent).toBeTruthy();
  });

  test('should display footer with copyright text', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    const footerText = await homePage.getFooterText();
    expect(footerText).toContain(testData.app.footerText);
  });
});
