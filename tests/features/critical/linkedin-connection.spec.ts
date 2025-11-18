import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { AssertionHelpers } from '../../helpers/assertion-helpers';
import { WaitHelpers } from '../../helpers/wait-helpers';

test.describe('LinkedIn Connection Feature', () => {
  test('should show connection result when checking LinkedIn connection', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.clickCheckConnection();
    
    // Assert
    const resultText = await homePage.getConnectionResult();
    expect(resultText).toMatch(/You are (not )?connected with me on LinkedIn/);
  });

  test('should contain LinkedIn URL in result when not connected', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.clickCheckConnection();
    
    // Wait for result to stabilize
    await WaitHelpers.waitForElementToBeStable(homePage.resultMessage);
    
    // Assert
    const resultText = await homePage.getConnectionResult();
    
    // Most likely the result will show "not connected" due to random probability
    if (resultText.includes('not connected')) {
      expect(resultText).toContain('linkedin.com');
    }
  });
});
