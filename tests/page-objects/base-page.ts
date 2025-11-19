import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage class - Abstract base class for all Page Objects
 * Provides common functionality and utilities for all pages
 */
export abstract class BasePage {
  protected page: Page;
  protected baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.BASE_URL || 'http://localhost:3000';
  }

  /**
   * Navigate to a specific URL
   * @param url - URL to navigate to (can be relative or absolute)
   */
  async navigate(url: string): Promise<void> {
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    await this.page.goto(fullURL, { waitUntil: 'networkidle' });
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Take a screenshot
   * @param name - Screenshot filename
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `tests/screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Wait for an element to be visible
   * @param locator - Element locator
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForElement(locator: Locator, timeout = 15000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for an element to be hidden
   * @param locator - Element locator
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForElementToDisappear(locator: Locator, timeout = 15000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Click an element with retry logic
   * @param locator - Element locator
   */
  async clickElement(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.click();
  }

  /**
   * Fill an input field
   * @param locator - Input locator
   * @param text - Text to fill
   */
  async fillInput(locator: Locator, text: string): Promise<void> {
    await this.waitForElement(locator);
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Get text content from an element
   * @param locator - Element locator
   */
  async getTextContent(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return (await locator.textContent()) || '';
  }

  /**
   * Check if element is visible
   * @param locator - Element locator
   */
  async isVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Assert element is visible
   * @param locator - Element locator
   * @param message - Custom error message
   */
  async assertElementVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  /**
   * Assert text content matches expected value
   * @param locator - Element locator
   * @param expectedText - Expected text content
   */
  async assertTextContent(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Assert URL contains expected string
   * @param expectedURLPart - Expected URL substring
   */
  async assertURL(expectedURLPart: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedURLPart));
  }

  /**
   * Reload the current page
   */
  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'networkidle' });
  }

  /**
   * Scroll element into view
   * @param locator - Element locator
   */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for specific amount of time (use sparingly)
   * @param milliseconds - Time to wait
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Execute JavaScript in the browser context
   * @param script - JavaScript code to execute
   */
  async executeScript<T>(script: string): Promise<T> {
    return await this.page.evaluate(script);
  }

  /**
   * Handle alerts/dialogs
   * @param accept - Whether to accept or dismiss the dialog
   */
  async handleDialog(accept = true): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }
}
