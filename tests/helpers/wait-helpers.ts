import { Page, Locator } from '@playwright/test';

/**
 * Helper functions for waiting in tests
 */
export class WaitHelpers {
  /**
   * Wait for an element to be visible
   * @param page - Playwright Page object
   * @param selector - The selector for the element to wait for
   * @param timeout - Optional timeout in milliseconds
   * @returns The Locator for the element
   */
  static async waitForElementVisible(page: Page, selector: string, timeout?: number): Promise<Locator> {
    const locator = page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  /**
   * Wait for an element to be hidden
   * @param page - Playwright Page object
   * @param selector - The selector for the element to wait for
   * @param timeout - Optional timeout in milliseconds
   * @returns The Locator for the element
   */
  static async waitForElementHidden(page: Page, selector: string, timeout?: number): Promise<Locator> {
    const locator = page.locator(selector);
    await locator.waitFor({ state: 'hidden', timeout });
    return locator;
  }

  /**
   * Wait for navigation to complete
   * @param page - Playwright Page object
   */
  static async waitForNavigation(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  }

  /**
   * Wait for a specific URL to load
   * @param page - Playwright Page object
   * @param urlPattern - The URL pattern to wait for
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForUrl(page: Page, urlPattern: string | RegExp, timeout?: number): Promise<void> {
    await page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Wait for a network request to complete
   * @param page - Playwright Page object
   * @param urlPattern - The URL pattern to wait for
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForRequest(page: Page, urlPattern: string | RegExp, timeout?: number): Promise<void> {
    await page.waitForRequest(urlPattern, { timeout });
  }

  /**
   * Wait for a network response to complete
   * @param page - Playwright Page object
   * @param urlPattern - The URL pattern to wait for
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForResponse(page: Page, urlPattern: string | RegExp, timeout?: number): Promise<void> {
    await page.waitForResponse(urlPattern, { timeout });
  }
}
