import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage class that serves as the foundation for all page objects
 * Contains common methods and utilities for page interactions
 */
export class BasePage {
  readonly page: Page;
  readonly url: string;

  /**
   * Constructor for the BasePage class
   * @param page - Playwright Page object
   * @param url - URL path for the page (appended to baseURL)
   */
  constructor(page: Page, url: string = '/') {
    this.page = page;
    this.url = url;
  }

  /**
   * Navigate to the page
   * @returns Promise that resolves when navigation is complete
   */
  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  /**
   * Get the page title
   * @returns Promise that resolves to the page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for the page to be loaded
   * Override in specific page objects with appropriate selectors
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot of the current page state
   * @param name - Name for the screenshot file
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `./test-results/screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Wait for an element to be visible
   * @param selector - Element selector
   * @param timeout - Optional timeout in milliseconds
   * @returns Locator for the element
   */
  async waitForElement(selector: string, timeout?: number): Promise<Locator> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  /**
   * Check if an element exists on the page
   * @param selector - Element selector
   * @returns Promise that resolves to boolean indicating if element exists
   */
  async elementExists(selector: string): Promise<boolean> {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  /**
   * Click on an element with retry logic
   * @param selector - Element selector
   */
  async clickElement(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /**
   * Fill a form field
   * @param selector - Field selector
   * @param value - Value to fill
   */
  async fillField(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }

  /**
   * Get text content from an element
   * @param selector - Element selector
   * @returns Promise that resolves to the element's text content
   */
  async getTextContent(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Assert that element contains text
   * @param selector - Element selector
   * @param text - Expected text
   */
  async expectElementToContainText(selector: string, text: string): Promise<void> {
    await expect(this.page.locator(selector)).toContainText(text);
  }

  /**
   * Assert that element is visible
   * @param selector - Element selector
   */
  async expectElementToBeVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }
}
