import { expect, Locator, Page } from '@playwright/test';

/**
 * Assert that element is visible
 * @param locator - Playwright locator for the element
 * @param message - Optional custom error message
 */
export async function assertElementVisible(locator: Locator, message?: string): Promise<void> {
  await expect(locator, message || 'Element should be visible').toBeVisible();
}

/**
 * Assert that element is hidden
 * @param locator - Playwright locator for the element
 * @param message - Optional custom error message
 */
export async function assertElementHidden(locator: Locator, message?: string): Promise<void> {
  await expect(locator, message || 'Element should be hidden').toBeHidden();
}

/**
 * Assert that element contains text
 * @param locator - Playwright locator for the element
 * @param text - Text to check for
 * @param message - Optional custom error message
 */
export async function assertElementContainsText(locator: Locator, text: string, message?: string): Promise<void> {
  await expect(locator, message || `Element should contain text "${text}"`).toContainText(text);
}

/**
 * Assert that element has exact text
 * @param locator - Playwright locator for the element
 * @param text - Text to check for
 * @param message - Optional custom error message
 */
export async function assertElementHasText(locator: Locator, text: string, message?: string): Promise<void> {
  await expect(locator, message || `Element should have exact text "${text}"`).toHaveText(text);
}

/**
 * Assert that page has URL
 * @param page - Playwright page object
 * @param url - URL to check for
 * @param message - Optional custom error message
 */
export async function assertPageHasURL(page: Page, url: string | RegExp, message?: string): Promise<void> {
  await expect(page, message || `Page URL should be "${url}"`).toHaveURL(url);
}

/**
 * Assert that page has title
 * @param page - Playwright page object
 * @param title - Title to check for
 * @param message - Optional custom error message
 */
export async function assertPageHasTitle(page: Page, title: string | RegExp, message?: string): Promise<void> {
  await expect(page, message || `Page title should be "${title}"`).toHaveTitle(title);
}
