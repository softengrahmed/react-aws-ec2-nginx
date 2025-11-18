import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page';

/**
 * Home page object representing the main landing page
 */
export class HomePage extends BasePage {
  // Locators
  readonly heading: Locator;
  readonly logo: Locator;
  readonly youtubeEmbed: Locator;
  readonly checkConnectionButton: Locator;
  readonly subscribeButton: Locator;
  readonly githubRepoButton: Locator;
  readonly resultMessage: Locator;
  readonly footer: Locator;

  /**
   * Constructor for HomePage
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page, '/');
    
    // Initialize locators
    this.heading = page.locator('header h1');
    this.logo = page.locator('.App-logo');
    this.youtubeEmbed = page.locator('iframe[src*="youtube.com"]');
    this.checkConnectionButton = page.getByRole('button', { name: 'Check Connection' });
    this.subscribeButton = page.getByRole('button', { name: 'Subscribe to my channel' });
    this.githubRepoButton = page.getByRole('button', { name: 'Github Repo' });
    this.resultMessage = page.locator('#result');
    this.footer = page.locator('footer');
  }

  /**
   * Wait for home page to be fully loaded
   * @returns Promise resolving to the current page instance
   */
  async waitForPageLoad(): Promise<this> {
    await super.waitForPageLoad();
    await this.waitForElement(this.heading);
    await this.waitForElement(this.logo);
    return this;
  }

  /**
   * Click the Check Connection button
   * @returns Promise resolving when click is complete
   */
  async clickCheckConnection(): Promise<void> {
    await this.clickElement(this.checkConnectionButton);
    // Wait for result to appear
    await this.waitForElement(this.resultMessage);
  }

  /**
   * Get the connection result message
   * @returns Promise resolving to the result message text
   */
  async getConnectionResult(): Promise<string> {
    return await this.getText(this.resultMessage);
  }

  /**
   * Click the Subscribe button
   * Note: This opens a new tab, which would need to be handled in the test
   * @returns Promise resolving when click is complete
   */
  async clickSubscribe(): Promise<void> {
    return await this.clickElement(this.subscribeButton);
  }

  /**
   * Click the Github Repo button
   * Note: This opens a new tab, which would need to be handled in the test
   * @returns Promise resolving when click is complete
   */
  async clickGithubRepo(): Promise<void> {
    return await this.clickElement(this.githubRepoButton);
  }

  /**
   * Check if YouTube embed is present and loaded
   * @returns Promise resolving to boolean indicating if embed is present
   */
  async isYoutubeEmbedPresent(): Promise<boolean> {
    return await this.isVisible(this.youtubeEmbed);
  }

  /**
   * Get footer text
   * @returns Promise resolving to the footer text
   */
  async getFooterText(): Promise<string> {
    return await this.getText(this.footer);
  }
}
