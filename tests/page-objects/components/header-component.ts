import { Page, Locator } from '@playwright/test';

/**
 * Header component representing the application header
 * Contains selectors and methods specific to the header component
 */
export class HeaderComponent {
  private readonly headerSelector = '.App-header';
  private readonly logoSelector = '.App-logo';
  private readonly linkSelector = '.App-link';
  
  private headerLocator: Locator;
  private logoLocator: Locator;
  private linkLocator: Locator;

  /**
   * Constructor for the HeaderComponent class
   * @param page - Playwright Page object
   */
  constructor(private page: Page) {
    this.headerLocator = this.page.locator(this.headerSelector);
    this.logoLocator = this.page.locator(this.logoSelector);
    this.linkLocator = this.page.locator(this.linkSelector);
  }

  /**
   * Check if the header is visible
   * @returns True if the header is visible, false otherwise
   */
  async isHeaderVisible(): Promise<boolean> {
    return await this.headerLocator.isVisible();
  }

  /**
   * Check if the logo is visible
   * @returns True if the logo is visible, false otherwise
   */
  async isLogoVisible(): Promise<boolean> {
    return await this.logoLocator.isVisible();
  }

  /**
   * Get the header text
   * @returns The header text content
   */
  async getHeaderText(): Promise<string> {
    return await this.headerLocator.textContent() || '';
  }

  /**
   * Click on the "Learn React" link
   */
  async clickLearnReactLink(): Promise<void> {
    await this.linkLocator.click();
  }

  /**
   * Get the URL of the "Learn React" link
   * @returns The href attribute of the link
   */
  async getLearnReactLinkUrl(): Promise<string> {
    return await this.linkLocator.getAttribute('href') || '';
  }
}
