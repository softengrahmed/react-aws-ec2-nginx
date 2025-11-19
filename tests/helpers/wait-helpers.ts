import { Page, Locator } from '@playwright/test';

/**
 * Smart wait strategies for improved test reliability
 */
export class WaitHelper {
  /**
   * Wait for network to be idle
   * @param page - Playwright page
   * @param timeout - Timeout in milliseconds
   */
  static async waitForNetworkIdle(page: Page, timeout = 30000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for DOM content to be loaded
   * @param page - Playwright page
   * @param timeout - Timeout in milliseconds
   */
  static async waitForDOMLoad(page: Page, timeout = 30000): Promise<void> {
    await page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * Wait for page to be fully loaded
   * @param page - Playwright page
   * @param timeout - Timeout in milliseconds
   */
  static async waitForPageLoad(page: Page, timeout = 30000): Promise<void> {
    await page.waitForLoadState('load', { timeout });
  }

  /**
   * Wait for element to be visible
   * @param locator - Element locator
   * @param timeout - Timeout in milliseconds
   */
  static async waitForVisible(locator: Locator, timeout = 15000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param locator - Element locator
   * @param timeout - Timeout in milliseconds
   */
  static async waitForHidden(locator: Locator, timeout = 15000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for element to be attached to DOM
   * @param locator - Element locator
   * @param timeout - Timeout in milliseconds
   */
  static async waitForAttached(locator: Locator, timeout = 15000): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout });
  }

  /**
   * Wait for specific URL
   * @param page - Playwright page
   * @param url - URL or pattern to wait for
   * @param timeout - Timeout in milliseconds
   */
  static async waitForURL(page: Page, url: string | RegExp, timeout = 30000): Promise<void> {
    await page.waitForURL(url, { timeout });
  }

  /**
   * Wait for navigation to complete
   * @param page - Playwright page
   * @param timeout - Timeout in milliseconds
   */
  static async waitForNavigation(page: Page, timeout = 30000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for specific selector to appear
   * @param page - Playwright page
   * @param selector - CSS selector
   * @param timeout - Timeout in milliseconds
   */
  static async waitForSelector(page: Page, selector: string, timeout = 15000): Promise<void> {
    await page.waitForSelector(selector, { timeout });
  }

  /**
   * Wait for function to return truthy value
   * @param page - Playwright page
   * @param fn - Function to evaluate
   * @param timeout - Timeout in milliseconds
   */
  static async waitForFunction(
    page: Page,
    fn: () => boolean | Promise<boolean>,
    timeout = 15000
  ): Promise<void> {
    await page.waitForFunction(fn, { timeout });
  }

  /**
   * Wait for specific request to complete
   * @param page - Playwright page
   * @param urlPattern - URL pattern to match
   * @param timeout - Timeout in milliseconds
   */
  static async waitForRequest(
    page: Page,
    urlPattern: string | RegExp,
    timeout = 30000
  ): Promise<void> {
    await page.waitForRequest(urlPattern, { timeout });
  }

  /**
   * Wait for specific response to complete
   * @param page - Playwright page
   * @param urlPattern - URL pattern to match
   * @param timeout - Timeout in milliseconds
   */
  static async waitForResponse(
    page: Page,
    urlPattern: string | RegExp,
    timeout = 30000
  ): Promise<void> {
    await page.waitForResponse(urlPattern, { timeout });
  }

  /**
   * Poll for condition with custom interval
   * @param condition - Condition function to check
   * @param interval - Polling interval in milliseconds
   * @param timeout - Maximum timeout in milliseconds
   */
  static async pollForCondition(
    condition: () => Promise<boolean>,
    interval = 500,
    timeout = 15000
  ): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    
    throw new Error(`Condition not met within ${timeout}ms`);
  }

  /**
   * Wait with custom timeout
   * @param milliseconds - Time to wait
   */
  static async wait(milliseconds: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
