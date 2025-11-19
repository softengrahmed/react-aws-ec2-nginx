import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { AssertionHelper } from '../../helpers/assertion-helpers';
import { WaitHelper } from '../../helpers/wait-helpers';

/**
 * Critical Tests - Home Page Functionality
 * Tests core functionality that must work for the application to be usable
 */
test.describe('Home Page - Critical Functionality', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should render all critical UI elements', async ({ page }) => {
    // Verify all critical elements are present
    await homePage.assertPageLoaded();
    
    // Additional assertions
    await AssertionHelper.assertTitle(page, /React App/);
    
    const isEditMessageVisible = await homePage.isEditMessageVisible();
    expect(isEditMessageVisible).toBeTruthy();
  });

  test('should have working navigation links', async ({ page }) => {
    // Verify Learn React link is clickable
    const href = await homePage.getLearnReactLinkHref();
    expect(href).toBeTruthy();
    expect(href).toContain('reactjs.org');
    
    // Verify link opens in new tab (target="_blank" or rel="noopener")
    const learnReactLink = page.getByRole('link', { name: /learn react/i });
    const target = await learnReactLink.getAttribute('target');
    const rel = await learnReactLink.getAttribute('rel');
    
    expect(target === '_blank' || rel?.includes('noopener')).toBeTruthy();
  });

  test('should display animated logo', async ({ page }) => {
    // Verify logo has animation class
    const isAnimated = await homePage.isLogoAnimated();
    expect(isAnimated).toBeTruthy();
  });

  test('should be responsive on different viewports', async ({ page }) => {
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await WaitHelper.wait(500);
    await homePage.assertPageLoaded();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await WaitHelper.wait(500);
    await homePage.assertPageLoaded();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await WaitHelper.wait(500);
    await homePage.assertPageLoaded();
  });

  test('should maintain state after page reload', async ({ page }) => {
    // Get initial state
    const initialTitle = await homePage.getTitle();
    const initialURL = await homePage.getCurrentURL();
    
    // Reload page
    await homePage.reload();
    await WaitHelper.waitForPageLoad(page);
    
    // Verify state is maintained
    const reloadedTitle = await homePage.getTitle();
    const reloadedURL = await homePage.getCurrentURL();
    
    expect(reloadedTitle).toBe(initialTitle);
    expect(reloadedURL).toBe(initialURL);
  });

  test('should handle network errors gracefully', async ({ page, context }) => {
    // Simulate offline mode
    await context.setOffline(true);
    
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' }).catch(() => null);
    
    // Expect navigation to fail gracefully
    expect(response).toBeNull();
    
    // Restore online mode
    await context.setOffline(false);
    await page.goto('/');
    await homePage.assertPageLoaded();
  });
});
