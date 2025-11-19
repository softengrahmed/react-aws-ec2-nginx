import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { HeaderComponent } from '../../page-objects/components/header-component';
import { FooterComponent } from '../../page-objects/components/footer-component';

test.describe('Visual Elements', () => {
  test('should display the React logo', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    await expect(homePage.logo).toBeVisible();
  });

  test('should have a visible header with correct structure', async ({ page }) => {
    // Arrange
    const headerComponent = new HeaderComponent(page);
    
    // Act
    await page.goto('/');
    
    // Assert
    await expect(headerComponent.headerContainer).toBeVisible();
    await expect(headerComponent.title).toBeVisible();
    
    const titleText = await headerComponent.getTitleText();
    expect(titleText).toContain('Welcome to');
    expect(titleText).toContain('CodeWithMuh');
    expect(titleText).toContain('Youtube Channel');
  });

  test('should have a visible footer with copyright information', async ({ page }) => {
    // Arrange
    const footerComponent = new FooterComponent(page);
    
    // Act
    await page.goto('/');
    
    // Assert
    await expect(footerComponent.footerContainer).toBeVisible();
    
    const copyrightText = await footerComponent.getCopyrightText();
    expect(copyrightText).toContain('©');
    expect(copyrightText).toContain('2024');
    expect(copyrightText).toContain('CodeWithMuh');
  });

  test('should have a YouTube video embed with correct attributes', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Assert
    await expect(homePage.youtubeEmbed).toBeVisible();
    await expect(homePage.youtubeEmbed).toHaveAttribute('width', '560');
    await expect(homePage.youtubeEmbed).toHaveAttribute('height', '315');
    await expect(homePage.youtubeEmbed).toHaveAttribute('src', new RegExp('youtube.com/embed/'));
    await expect(homePage.youtubeEmbed).toHaveAttribute('allowFullScreen');
  });
});
