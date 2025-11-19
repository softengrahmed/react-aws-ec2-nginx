import { expect, Locator, Page } from '@playwright/test';

/**
 * Custom assertion helpers for enhanced test readability
 */
export class AssertionHelper {
  /**
   * Assert that multiple elements are visible
   * @param locators - Array of locators to check
   * @param message - Optional custom message
   */
  static async assertAllVisible(locators: Locator[], message?: string): Promise<void> {
    for (const locator of locators) {
      await expect(locator, message).toBeVisible();
    }
  }

  /**
   * Assert that element contains specific text
   * @param locator - Element locator
   * @param text - Expected text (can be partial match)
   */
  static async assertContainsText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }

  /**
   * Assert that page URL matches pattern
   * @param page - Playwright page
   * @param pattern - URL pattern (string or RegExp)
   */
  static async assertURLMatches(page: Page, pattern: string | RegExp): Promise<void> {
    await expect(page).toHaveURL(pattern);
  }

  /**
   * Assert that element has specific attribute value
   * @param locator - Element locator
   * @param attribute - Attribute name
   * @param value - Expected attribute value
   */
  static async assertAttribute(
    locator: Locator,
    attribute: string,
    value: string
  ): Promise<void> {
    await expect(locator).toHaveAttribute(attribute, value);
  }

  /**
   * Assert that element is enabled
   * @param locator - Element locator
   */
  static async assertEnabled(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled();
  }

  /**
   * Assert that element is disabled
   * @param locator - Element locator
   */
  static async assertDisabled(locator: Locator): Promise<void> {
    await expect(locator).toBeDisabled();
  }

  /**
   * Assert element count matches expected value
   * @param locator - Element locator
   * @param count - Expected count
   */
  static async assertCount(locator: Locator, count: number): Promise<void> {
    await expect(locator).toHaveCount(count);
  }

  /**
   * Assert that element has specific CSS class
   * @param locator - Element locator
   * @param className - CSS class name
   */
  static async assertHasClass(locator: Locator, className: string): Promise<void> {
    await expect(locator).toHaveClass(new RegExp(className));
  }

  /**
   * Assert that page title matches expected value
   * @param page - Playwright page
   * @param title - Expected title
   */
  static async assertTitle(page: Page, title: string | RegExp): Promise<void> {
    await expect(page).toHaveTitle(title);
  }

  /**
   * Assert that element is not visible
   * @param locator - Element locator
   */
  static async assertNotVisible(locator: Locator): Promise<void> {
    await expect(locator).not.toBeVisible();
  }

  /**
   * Assert that element is checked (for checkboxes/radio buttons)
   * @param locator - Element locator
   */
  static async assertChecked(locator: Locator): Promise<void> {
    await expect(locator).toBeChecked();
  }

  /**
   * Assert that element value matches expected
   * @param locator - Input element locator
   * @param value - Expected value
   */
  static async assertValue(locator: Locator, value: string): Promise<void> {
    await expect(locator).toHaveValue(value);
  }

  /**
   * Soft assertion - test continues even if assertion fails
   * @param callback - Assertion callback
   */
  static async softAssert(callback: () => Promise<void>): Promise<void> {
    try {
      await callback();
    } catch (error) {
      console.warn('Soft assertion failed:', error);
    }
  }
}
