import { Page, Locator } from '@playwright/test';

/**
 * HeaderComponent class representing the header component of the application
 * Contains selectors and methods specific to the header component
 */
export class HeaderComponent {
  readonly page: Page;
  readonly headerContainer: Locator;
  readonly appLogo: Locator;
  readonly appLink: Locator;

  /**
   * Constructor for the HeaderComponent
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    this.headerContainer = page.locator('.App-header');
    this.appLogo = page.locator('.App-logo');
    this.appLink = page.locator('.App-link');
  }

  /**
   * Check if the header is visible
   * @returns True if the header is visible, false otherwise
   */
  async isHeaderVisible(): Promise<boolean> {
    return await this.headerContainer.isVisible();
  }

  /**
   * Get the header text
   * @returns The text content of the header
   */
  async getHeaderText(): Promise<string> {
    return await this.headerContainer.textContent() || '';
  }

  /**
   * Check if the logo is spinning (has the spin class)
   * @returns True if the logo has the spin class, false otherwise
   */
  async isLogoSpinning(): Promise<boolean> {
    const className = await this.appLogo.getAttribute('class') || '';
    return className.includes('App-logo-spin');
  }

  /**
   * Click on the React learn link
   */
  async clickLearnReactLink(): Promise<void> {
    await this.appLink.click();
  }
}
