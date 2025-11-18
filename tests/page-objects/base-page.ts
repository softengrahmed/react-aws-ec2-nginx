import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage class that serves as a foundation for all page objects
 * Contains common methods and utilities used across all pages
 */
export class BasePage {
  readonly page: Page;
  readonly baseUrl: string;

  /**
   * Constructor for the BasePage
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  }

  /**
   * Navigate to a specific URL path
   * @param path - The path to navigate to (appended to baseUrl)
   */
  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  /**
   * Wait for a specific element to be visible
   * @param selector - The selector for the element to wait for
   * @param timeout - Optional timeout in milliseconds
   * @returns The locator for the element
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<Locator> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  /**
   * Check if an element is visible
   * @param selector - The selector for the element to check
   * @returns True if the element is visible, false otherwise
   */
  async isElementVisible(selector: string): Promise<boolean> {
    const locator = this.page.locator(selector);
    return await locator.isVisible();
  }

  /**
   * Fill a form field with text
   * @param selector - The selector for the form field
   * @param text - The text to fill in
   */
  async fillField(selector: string, text: string): Promise<void> {
    const field = this.page.locator(selector);
    await field.fill(text);
  }

  /**
   * Click on an element
   * @param selector - The selector for the element to click
   */
  async clickElement(selector: string): Promise<void> {
    const element = this.page.locator(selector);
    await element.click();
  }

  /**
   * Get text from an element
   * @param selector - The selector for the element
   * @returns The text content of the element
   */
  async getElementText(selector: string): Promise<string> {
    const element = this.page.locator(selector);
    return await element.textContent() || '';
  }

  /**
   * Take a screenshot with a custom name
   * @param name - Name for the screenshot file
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `./test-results/screenshots/${name}.png` });
  }

  /**
   * Wait for page load state to be complete
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  /**
   * Assert that page title contains expected text
   * @param title - Expected title text
   */
  async assertPageTitle(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(title, 'i'));
  }

  /**
   * Assert that an element contains expected text
   * @param selector - The selector for the element
   * @param text - Expected text content
   */
  async assertElementText(selector: string, text: string): Promise<void> {
    const element = this.page.locator(selector);
    await expect(element).toContainText(text);
  }
}
