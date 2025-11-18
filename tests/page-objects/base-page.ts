import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage class that all page objects should extend
 * Contains common methods and utilities for all pages
 */
export class BasePage {
  readonly page: Page;
  readonly url: string;

  /**
   * Constructor for BasePage
   * @param page - Playwright Page object
   * @param url - URL path for the page (appended to baseURL)
   */
  constructor(page: Page, url: string = '/') {
    this.page = page;
    this.url = url;
  }

  /**
   * Navigate to the page
   * @returns Promise resolving to the current page instance
   */
  async goto(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  /**
   * Wait for page to be loaded
   * Override in specific page classes with more specific wait conditions
   * @returns Promise resolving to the current page instance
   */
  async waitForPageLoad(): Promise<this> {
    await this.page.waitForLoadState('domcontentloaded');
    return this;
  }

  /**
   * Get page title
   * @returns Promise resolving to the page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if element is visible
   * @param locator - Playwright Locator for the element
   * @returns Promise resolving to boolean indicating visibility
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Wait for element to be visible
   * @param locator - Playwright Locator for the element
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise resolving to the Locator
   */
  async waitForElement(locator: Locator, timeout?: number): Promise<Locator> {
    await expect(locator).toBeVisible({ timeout });
    return locator;
  }

  /**
   * Click on element with retry logic
   * @param locator - Playwright Locator for the element
   * @returns Promise resolving when click is complete
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Fill input field
   * @param locator - Playwright Locator for the input element
   * @param text - Text to enter in the field
   * @returns Promise resolving when fill is complete
   */
  async fillInput(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Get text from element
   * @param locator - Playwright Locator for the element
   * @returns Promise resolving to the element text
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Take screenshot with meaningful name
   * @param name - Name for the screenshot file
   * @returns Promise resolving to the screenshot path
   */
  async takeScreenshot(name: string): Promise<string | null | undefined> {
    return await this.page.screenshot({ 
      path: `./test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }
}
