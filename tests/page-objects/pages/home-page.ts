import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page';

/**
 * HomePage class representing the home page of the application
 * Contains methods and locators specific to the home page
 */
export class HomePage extends BasePage {
  // Locators
  readonly header: Locator;
  readonly logo: Locator;
  readonly youtubeEmbed: Locator;
  readonly checkConnectionButton: Locator;
  readonly subscribeButton: Locator;
  readonly githubRepoButton: Locator;
  readonly resultText: Locator;
  readonly footer: Locator;

  /**
   * Constructor for HomePage
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    super(page, '/');
    
    // Initialize locators
    this.header = page.locator('header h1');
    this.logo = page.locator('.App-logo');
    this.youtubeEmbed = page.locator('iframe[src*="youtube.com"]');
    this.checkConnectionButton = page.locator('button:has-text("Check Connection")');
    this.subscribeButton = page.locator('button:has-text("Subscribe to my channel")');
    this.githubRepoButton = page.locator('button:has-text("Github Repo")');
    this.resultText = page.locator('#result');
    this.footer = page.locator('footer');
  }

  /**
   * Override waitForPageLoad to include specific conditions for home page
   * @returns Promise resolving to the current page instance
   */
  async waitForPageLoad(): Promise<this> {
    await this.waitForElement(this.header);
    await this.waitForElement(this.logo);
    return this;
  }

  /**
   * Click the Check Connection button
   * @returns Promise resolving when click is complete
   */
  async clickCheckConnection(): Promise<void> {
    await this.clickElement(this.checkConnectionButton);
  }

  /**
   * Click the Subscribe button
   * @returns Promise resolving when click is complete
   */
  async clickSubscribe(): Promise<void> {
    await this.clickElement(this.subscribeButton);
  }

  /**
   * Click the Github Repo button
   * @returns Promise resolving when click is complete
   */
  async clickGithubRepo(): Promise<void> {
    await this.clickElement(this.githubRepoButton);
  }

  /**
   * Get the result text after checking LinkedIn connection
   * @returns Promise resolving to the result text
   */
  async getResultText(): Promise<string> {
    return await this.getText(this.resultText);
  }

  /**
   * Check if YouTube embed is present
   * @returns Promise resolving to boolean indicating if YouTube embed is present
   */
  async isYoutubeEmbedPresent(): Promise<boolean> {
    return await this.isVisible(this.youtubeEmbed);
  }

  /**
   * Get the header text
   * @returns Promise resolving to the header text
   */
  async getHeaderText(): Promise<string> {
    return await this.getText(this.header);
  }

  /**
   * Get the footer text
   * @returns Promise resolving to the footer text
   */
  async getFooterText(): Promise<string> {
    return await this.getText(this.footer);
  }
}
