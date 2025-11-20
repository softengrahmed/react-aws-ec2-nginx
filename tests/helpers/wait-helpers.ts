import { Page, Locator } from '@playwright/test';

/**
 * Wait for an element to be visible
 * @param page - Playwright Page object
 * @param selector - Element selector
 * @param timeout - Optional timeout in milliseconds
 * @returns Promise that resolves when element is visible
 */
export async function waitForElementVisible(
  page: Page,
  selector: string,
  timeout?: number
): Promise<Locator> {
  const locator = page.locator(selector);
  await locator.waitFor({ state: 'visible', timeout });
  return locator;
}

/**
 * Wait for an element to be hidden
 * @param page - Playwright Page object
 * @param selector - Element selector
 * @param timeout - Optional timeout in milliseconds
 * @returns Promise that resolves when element is hidden
 */
export async function waitForElementHidden(
  page: Page,
  selector: string,
  timeout?: number
): Promise<Locator> {
  const locator = page.locator(selector);
  await locator.waitFor({ state: 'hidden', timeout });
  return locator;
}

/**
 * Wait for network to be idle
 * @param page - Playwright Page object
 * @returns Promise that resolves when network is idle
 */
export async function waitForNetworkIdle(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}

/**
 * Wait for page to be fully loaded
 * @param page - Playwright Page object
 * @returns Promise that resolves when page is loaded
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('load');
}

/**
 * Wait for a condition to be true with timeout
 * @param predicate - Function that returns a promise resolving to a boolean
 * @param options - Options for the wait operation
 * @returns Promise that resolves when condition is true
 */
export async function waitForCondition(
  predicate: () => Promise<boolean>,
  options: { timeout?: number; pollingInterval?: number; message?: string } = {}
): Promise<void> {
  const { timeout = 30000, pollingInterval = 500, message = 'Condition not met' } = options;
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await predicate()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, pollingInterval));
  }

  throw new Error(`Timed out waiting for condition: ${message}`);
}
