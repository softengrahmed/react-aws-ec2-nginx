import { Page, Locator } from '@playwright/test';

/**
 * Wait for element to be visible
 * @param locator - Playwright locator for the element
 * @param timeout - Optional timeout in milliseconds
 * @returns Promise resolving when element is visible
 */
export async function waitForElementVisible(locator: Locator, timeout?: number): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

/**
 * Wait for element to be hidden
 * @param locator - Playwright locator for the element
 * @param timeout - Optional timeout in milliseconds
 * @returns Promise resolving when element is hidden
 */
export async function waitForElementHidden(locator: Locator, timeout?: number): Promise<void> {
  await locator.waitFor({ state: 'hidden', timeout });
}

/**
 * Wait for navigation to complete
 * @param page - Playwright page object
 * @returns Promise resolving when navigation is complete
 */
export async function waitForNavigation(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}

/**
 * Wait for a specific URL to load
 * @param page - Playwright page object
 * @param urlPattern - URL pattern to wait for
 * @param timeout - Optional timeout in milliseconds
 * @returns Promise resolving when URL matches pattern
 */
export async function waitForUrl(page: Page, urlPattern: string | RegExp, timeout?: number): Promise<void> {
  await page.waitForURL(urlPattern, { timeout });
}

/**
 * Wait for a specific number of milliseconds
 * Note: This should be used sparingly, prefer more explicit waits
 * @param ms - Milliseconds to wait
 * @returns Promise resolving after specified time
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
