import { Page, Locator } from '@playwright/test';

/**
 * HeaderComponent class representing the header component of the application
 * Contains methods and locators specific to the header
 */
export class HeaderComponent {
  readonly page: Page;
  readonly headerContainer: Locator;
  readonly title: Locator;

  /**
   * Constructor for HeaderComponent
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    this.headerContainer = page.locator('header');
    this.title = page.locator('header h1');
  }

  /**
   * Get the header title text
   * @returns Promise resolving to the header title text
   */
  async getTitleText(): Promise<string> {
    return await this.title.innerText();
  }

  /**
   * Check if header is visible
   * @returns Promise resolving to boolean indicating if header is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.headerContainer.isVisible();
  }
}
