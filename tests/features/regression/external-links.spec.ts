import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import testData from '../../fixtures/test-data.json';

test.describe('External Links', () => {
  test('should open YouTube channel in new tab when clicking Subscribe button', async ({ page, context }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Create a listener for new pages
    const pagePromise = context.waitForEvent('page');
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Click the button that opens a new tab
    await homePage.clickSubscribe();
    
    // Wait for the new page to open
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    
    // Assert
    expect(newPage.url()).toContain('youtube.com');
  });

  test('should open GitHub repo in new tab when clicking Github Repo button', async ({ page, context }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Create a listener for new pages
    const pagePromise = context.waitForEvent('page');
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    // Click the button that opens a new tab
    await homePage.clickGithubRepo();
    
    // Wait for the new page to open
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    
    // Assert
    expect(newPage.url()).toContain('github.com');
    expect(newPage.url()).toContain('react-aws-ec2-nginx');
  });
});
