import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage class that all page objects should extend
 * Contains common methods and utilities for page interactions
 */
export class BasePage {
  /**
   * Constructor for the BasePage class
   * @param page - Playwright Page object
   */
  constructor(protected page: Page) {}

  /**
   * Navigate to a specific URL path
   * @param path - The URL path to navigate to
   */
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Get the current page title
   * @returns The page title as a string
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for a specific element to be visible
   * @param selector - The selector for the element to wait for
   * @param timeout - Optional timeout in milliseconds
   * @returns The Locator for the element
   */
  async waitForElement(selector: string, timeout?: number): Promise<Locator> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  /**
   * Check if an element is visible on the page
   * @param selector - The selector for the element to check
   * @returns True if the element is visible, false otherwise
   */
  async isElementVisible(selector: string): Promise<boolean> {
    const locator = this.page.locator(selector);
    return await locator.isVisible();
  }

  /**
   * Click on an element
   * @param selector - The selector for the element to click
   */
  async clickElement(selector: string): Promise<void> {
    const locator = await this.waitForElement(selector);
    await locator.click();
  }

  /**
   * Fill a form field with text
   * @param selector - The selector for the form field
   * @param text - The text to enter into the field
   */
  async fillField(selector: string, text: string): Promise<void> {
    const locator = await this.waitForElement(selector);
    await locator.fill(text);
  }

  /**
   * Get text content from an element
   * @param selector - The selector for the element
   * @returns The text content of the element
   */
  async getElementText(selector: string): Promise<string> {
    const locator = await this.waitForElement(selector);
    return await locator.textContent() || '';
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot
   * @param name - Name for the screenshot file
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `./test-results/screenshots/${name}.png` });
  }

  /**
   * Assert that page title contains expected text
   * @param expectedTitle - The expected title text
   */
  async assertPageTitle(expectedTitle: string): Promise<void> {
    const title = await this.getTitle();
    expect(title).toContain(expectedTitle);
  }

  /**
   * Assert that an element contains expected text
   * @param selector - The selector for the element
   * @param expectedText - The expected text content
   */
  async assertElementText(selector: string, expectedText: string): Promise<void> {
    const text = await this.getElementText(selector);
    expect(text).toContain(expectedText);
  }

  /**
   * Assert that an element is visible
   * @param selector - The selector for the element
   */
  async assertElementVisible(selector: string): Promise<void> {
    const isVisible = await this.isElementVisible(selector);
    expect(isVisible).toBeTruthy();
  }
}
