import { Page, Locator, expect } from '@playwright/test';

/**
 * Custom assertion helpers to extend Playwright's built-in assertions
 */
export class AssertionHelpers {
  /**
   * Assert that an element is visible
   * @param locator - The locator for the element
   * @param message - Optional custom error message
   */
  static async assertElementVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message || 'Element should be visible').toBeVisible();
  }

  /**
   * Assert that an element is hidden
   * @param locator - The locator for the element
   * @param message - Optional custom error message
   */
  static async assertElementHidden(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message || 'Element should be hidden').toBeHidden();
  }

  /**
   * Assert that an element contains specific text
   * @param locator - The locator for the element
   * @param text - Expected text content
   * @param message - Optional custom error message
   */
  static async assertElementContainsText(
    locator: Locator,
    text: string,
    message?: string
  ): Promise<void> {
    await expect(locator, message || `Element should contain text: ${text}`).toContainText(text);
  }

  /**
   * Assert that an element has exact text
   * @param locator - The locator for the element
   * @param text - Expected exact text content
   * @param message - Optional custom error message
   */
  static async assertElementHasText(
    locator: Locator,
    text: string,
    message?: string
  ): Promise<void> {
    await expect(locator, message || `Element should have exact text: ${text}`).toHaveText(text);
  }

  /**
   * Assert that page URL contains specific text
   * @param page - Playwright page object
   * @param urlText - Expected text in URL
   * @param message - Optional custom error message
   */
  static async assertUrlContains(
    page: Page,
    urlText: string,
    message?: string
  ): Promise<void> {
    await expect(page, message || `URL should contain: ${urlText}`).toHaveURL(new RegExp(urlText));
  }

  /**
   * Assert that page has a specific title
   * @param page - Playwright page object
   * @param title - Expected page title
   * @param message - Optional custom error message
   */
  static async assertPageTitle(page: Page, title: string, message?: string): Promise<void> {
    await expect(page, message || `Page title should be: ${title}`).toHaveTitle(title);
  }

  /**
   * Assert that an element has a specific attribute value
   * @param locator - The locator for the element
   * @param attributeName - Name of the attribute
   * @param attributeValue - Expected attribute value
   * @param message - Optional custom error message
   */
  static async assertElementAttribute(
    locator: Locator,
    attributeName: string,
    attributeValue: string,
    message?: string
  ): Promise<void> {
    await expect(
      locator,
      message || `Element should have attribute ${attributeName}=${attributeValue}`
    ).toHaveAttribute(attributeName, attributeValue);
  }
}
