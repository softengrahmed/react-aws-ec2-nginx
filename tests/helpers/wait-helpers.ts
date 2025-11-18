import { Page, Locator } from '@playwright/test';

/**
 * Custom wait helpers to extend Playwright's built-in wait functionality
 */
export class WaitHelpers {
  /**
   * Wait for an element to be visible
   * @param locator - The locator for the element
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForElementVisible(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for an element to be hidden
   * @param locator - The locator for the element
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForElementHidden(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for an element to contain specific text
   * @param locator - The locator for the element
   * @param text - Expected text content
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForElementText(
    locator: Locator,
    text: string,
    timeout: number = 5000
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.filter({ hasText: text }).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for page navigation to complete
   * @param page - Playwright page object
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForNavigation(page: Page, timeout: number = 5000): Promise<void> {
    await page.waitForLoadState('load', { timeout });
  }

  /**
   * Wait for network requests to be idle
   * @param page - Playwright page object
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForNetworkIdle(page: Page, timeout: number = 5000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for a specific URL pattern
   * @param page - Playwright page object
   * @param urlPattern - URL pattern to wait for (string or RegExp)
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForUrl(
    page: Page,
    urlPattern: string | RegExp,
    timeout: number = 5000
  ): Promise<void> {
    await page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Wait for a condition to be true
   * @param condition - Function that returns a promise resolving to a boolean
   * @param timeout - Optional timeout in milliseconds
   * @param pollingInterval - Optional polling interval in milliseconds
   */
  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number = 5000,
    pollingInterval: number = 100
  ): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, pollingInterval));
    }
    throw new Error(`Condition not met within ${timeout}ms`);
  }
}
