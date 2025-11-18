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
   * @param page - Playwright page object
   * @param url - URL path for the page (will be appended to baseURL)
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
   * Override in specific page objects with more specific conditions
   * @returns Promise resolving to the current page instance
   */
  async waitForPageLoad(): Promise<this> {
    await this.page.waitForLoadState('networkidle');
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
   * @param locator - Playwright locator for the element
   * @returns Promise resolving to boolean indicating if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Wait for element to be visible
   * @param locator - Playwright locator for the element
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise resolving to the locator
   */
  async waitForElement(locator: Locator, timeout?: number): Promise<Locator> {
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  /**
   * Click on element with retry logic
   * @param locator - Playwright locator for the element
   * @returns Promise resolving when click is complete
   */
  async clickElement(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.click();
  }

  /**
   * Fill input field
   * @param locator - Playwright locator for the input field
   * @param text - Text to enter
   * @returns Promise resolving when fill is complete
   */
  async fillInput(locator: Locator, text: string): Promise<void> {
    await this.waitForElement(locator);
    await locator.fill(text);
  }

  /**
   * Get text from element
   * @param locator - Playwright locator for the element
   * @returns Promise resolving to the element text
   */
  async getText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return await locator.innerText();
  }

  /**
   * Take screenshot with meaningful name
   * @param name - Name for the screenshot
   * @returns Promise resolving to buffer containing the screenshot
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({ path: `./screenshots/${name}.png`, fullPage: true });
  }
}
