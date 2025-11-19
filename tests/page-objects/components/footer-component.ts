import { Page, Locator } from '@playwright/test';

/**
 * FooterComponent class representing the footer component of the application
 * Contains methods and locators specific to the footer
 */
export class FooterComponent {
  readonly page: Page;
  readonly footerContainer: Locator;
  readonly copyrightText: Locator;

  /**
   * Constructor for FooterComponent
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    this.footerContainer = page.locator('footer');
    this.copyrightText = page.locator('footer p');
  }

  /**
   * Get the copyright text
   * @returns Promise resolving to the copyright text
   */
  async getCopyrightText(): Promise<string> {
    return await this.copyrightText.innerText();
  }

  /**
   * Check if footer is visible
   * @returns Promise resolving to boolean indicating if footer is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.footerContainer.isVisible();
  }
}
