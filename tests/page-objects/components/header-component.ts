import { Page, Locator } from '@playwright/test';

/**
 * HeaderComponent class representing the header component of the application
 * Contains selectors and methods specific to the header
 */
export class HeaderComponent {
  readonly page: Page;
  readonly headerContainer: Locator;
  readonly title: Locator;
  readonly channelName: Locator;

  /**
   * Constructor for the HeaderComponent class
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.headerContainer = page.locator('header');
    this.title = this.headerContainer.locator('h1');
    this.channelName = this.headerContainer.locator('h1 span');
  }

  /**
   * Get the header title text
   * @returns Promise that resolves to the header title text
   */
  async getTitleText(): Promise<string | null> {
    return await this.title.textContent();
  }

  /**
   * Get the channel name text
   * @returns Promise that resolves to the channel name text
   */
  async getChannelName(): Promise<string | null> {
    return await this.channelName.textContent();
  }

  /**
   * Check if the header is visible
   * @returns Promise that resolves to boolean indicating if header is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.headerContainer.isVisible();
  }
}
