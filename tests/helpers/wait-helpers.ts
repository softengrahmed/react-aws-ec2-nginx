import { Page, Locator } from '@playwright/test';

/**
 * Helper functions for waiting in tests
 */
export class WaitHelpers {
  /**
   * Wait for network to be idle
   * @param page - Playwright Page object
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise resolving when network is idle
   */
  static async waitForNetworkIdle(page: Page, timeout?: number): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for page to be fully loaded
   * @param page - Playwright Page object
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise resolving when page is loaded
   */
  static async waitForPageLoad(page: Page, timeout?: number): Promise<void> {
    await page.waitForLoadState('load', { timeout });
  }

  /**
   * Wait for element to be visible and stable
   * @param locator - Playwright Locator for the element
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise resolving when element is visible and stable
   */
  static async waitForElementToBeStable(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    // Additional wait to ensure element is stable
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  /**
   * Wait for element to contain text
   * @param locator - Playwright Locator for the element
   * @param text - Text to wait for
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise resolving when element contains text
   */
  static async waitForElementToContainText(
    locator: Locator, 
    text: string, 
    timeout?: number
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.waitFor({ 
      state: 'attached',
      timeout,
      predicate: async (element) => {
        const content = await element.textContent();
        return content !== null && content.includes(text);
      }
    });
  }
}
