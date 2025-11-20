import { Page, Locator, expect } from '@playwright/test';

/**
 * Assert that element contains text
 * @param locator - Element locator
 * @param text - Expected text
 * @param options - Optional parameters
 */
export async function expectToContainText(
  locator: Locator,
  text: string,
  options?: { ignoreCase?: boolean }
): Promise<void> {
  if (options?.ignoreCase) {
    const content = await locator.textContent();
    expect(content?.toLowerCase()).toContain(text.toLowerCase());
  } else {
    await expect(locator).toContainText(text);
  }
}

/**
 * Assert that element has exact text
 * @param locator - Element locator
 * @param text - Expected text
 * @param options - Optional parameters
 */
export async function expectToHaveText(
  locator: Locator,
  text: string,
  options?: { ignoreCase?: boolean }
): Promise<void> {
  if (options?.ignoreCase) {
    const content = await locator.textContent();
    expect(content?.toLowerCase()).toBe(text.toLowerCase());
  } else {
    await expect(locator).toHaveText(text);
  }
}

/**
 * Assert that element is visible
 * @param locator - Element locator
 */
export async function expectToBeVisible(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
}

/**
 * Assert that element is hidden
 * @param locator - Element locator
 */
export async function expectToBeHidden(locator: Locator): Promise<void> {
  await expect(locator).toBeHidden();
}

/**
 * Assert that element has attribute with value
 * @param locator - Element locator
 * @param attribute - Attribute name
 * @param value - Expected attribute value
 */
export async function expectToHaveAttribute(
  locator: Locator,
  attribute: string,
  value: string
): Promise<void> {
  await expect(locator).toHaveAttribute(attribute, value);
}

/**
 * Assert that page has title
 * @param page - Playwright Page object
 * @param title - Expected title
 */
export async function expectPageToHaveTitle(page: Page, title: string): Promise<void> {
  await expect(page).toHaveTitle(title);
}

/**
 * Assert that page has URL
 * @param page - Playwright Page object
 * @param url - Expected URL
 */
export async function expectPageToHaveURL(page: Page, url: string): Promise<void> {
  await expect(page).toHaveURL(url);
}
