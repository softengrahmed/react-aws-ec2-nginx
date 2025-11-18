import { expect, Locator, Page } from '@playwright/test';

/**
 * Helper functions for common assertions in tests
 */
export class AssertionHelpers {
  /**
   * Assert that page has expected title
   * @param page - Playwright Page object
   * @param expectedTitle - Expected page title
   * @returns Promise resolving when assertion completes
   */
  static async assertPageTitle(page: Page, expectedTitle: string): Promise<void> {
    await expect(page).toHaveTitle(expectedTitle);
  }

  /**
   * Assert that element contains expected text
   * @param locator - Playwright Locator for the element
   * @param expectedText - Expected text content
   * @returns Promise resolving when assertion completes
   */
  static async assertElementContainsText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toContainText(expectedText);
  }

  /**
   * Assert that element has exact text
   * @param locator - Playwright Locator for the element
   * @param expectedText - Expected exact text content
   * @returns Promise resolving when assertion completes
   */
  static async assertElementHasText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Assert that element is visible
   * @param locator - Playwright Locator for the element
   * @returns Promise resolving when assertion completes
   */
  static async assertElementIsVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Assert that element is not visible
   * @param locator - Playwright Locator for the element
   * @returns Promise resolving when assertion completes
   */
  static async assertElementIsNotVisible(locator: Locator): Promise<void> {
    await expect(locator).not.toBeVisible();
  }

  /**
   * Assert that URL contains expected path
   * @param page - Playwright Page object
   * @param expectedUrlPath - Expected URL path
   * @returns Promise resolving when assertion completes
   */
  static async assertUrlContains(page: Page, expectedUrlPath: string): Promise<void> {
    await expect(page).toHaveURL(new RegExp(expectedUrlPath));
  }
}
