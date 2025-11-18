import { Page, Locator, expect } from '@playwright/test';

/**
 * Helper functions for assertions in tests
 */
export class AssertionHelpers {
  /**
   * Assert that an element is visible
   * @param locator - Playwright Locator object
   * @param message - Optional custom error message
   */
  static async assertElementVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  /**
   * Assert that an element is hidden
   * @param locator - Playwright Locator object
   * @param message - Optional custom error message
   */
  static async assertElementHidden(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeHidden();
  }

  /**
   * Assert that an element contains text
   * @param locator - Playwright Locator object
   * @param text - The text to check for
   * @param message - Optional custom error message
   */
  static async assertElementContainsText(locator: Locator, text: string, message?: string): Promise<void> {
    await expect(locator, message).toContainText(text);
  }

  /**
   * Assert that an element has exact text
   * @param locator - Playwright Locator object
   * @param text - The exact text to check for
   * @param message - Optional custom error message
   */
  static async assertElementHasText(locator: Locator, text: string, message?: string): Promise<void> {
    await expect(locator, message).toHaveText(text);
  }

  /**
   * Assert that page has a specific title
   * @param page - Playwright Page object
   * @param title - The title to check for
   * @param message - Optional custom error message
   */
  static async assertPageHasTitle(page: Page, title: string, message?: string): Promise<void> {
    await expect(page, message).toHaveTitle(title);
  }

  /**
   * Assert that page has a specific URL
   * @param page - Playwright Page object
   * @param url - The URL to check for
   * @param message - Optional custom error message
   */
  static async assertPageHasUrl(page: Page, url: string | RegExp, message?: string): Promise<void> {
    await expect(page, message).toHaveURL(url);
  }

  /**
   * Assert that an element has a specific attribute value
   * @param locator - Playwright Locator object
   * @param attributeName - The name of the attribute
   * @param value - The expected attribute value
   * @param message - Optional custom error message
   */
  static async assertElementHasAttribute(
    locator: Locator, 
    attributeName: string, 
    value: string, 
    message?: string
  ): Promise<void> {
    await expect(locator, message).toHaveAttribute(attributeName, value);
  }

  /**
   * Assert that an element is enabled
   * @param locator - Playwright Locator object
   * @param message - Optional custom error message
   */
  static async assertElementEnabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeEnabled();
  }

  /**
   * Assert that an element is disabled
   * @param locator - Playwright Locator object
   * @param message - Optional custom error message
   */
  static async assertElementDisabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeDisabled();
  }
}
