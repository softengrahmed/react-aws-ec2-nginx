import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

/**
 * HomePage class representing the home page of the application
 * Contains selectors and methods specific to the home page
 */
export class HomePage extends BasePage {
  // Selectors
  readonly headerTitle = 'h1';
  readonly logo = '.App-logo';
  readonly youtubeIframe = 'iframe[src*="youtube.com"]';
  readonly awsText = 'p span:text("AWS EC2")';
  readonly linkedInGameTitle = 'h2:text("LinkedIn Connection Game")';
  readonly checkConnectionButton = 'button:text("Check Connection")';
  readonly resultText = '#result';
  readonly subscribeButton = 'button:text("Subscribe to my channel")';
  readonly githubRepoButton = 'button:text("Github Repo")';
  readonly footer = 'footer p';

  /**
   * Constructor for the HomePage class
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page, '/');
  }

  /**
   * Wait for the home page to be loaded
   * Checks for key elements that indicate the page is ready
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.headerTitle);
    await this.waitForElement(this.logo);
  }

  /**
   * Get the header title text
   * @returns Promise that resolves to the header title text
   */
  async getHeaderTitle(): Promise<string | null> {
    return await this.getTextContent(this.headerTitle);
  }

  /**
   * Check if the YouTube iframe is present
   * @returns Promise that resolves to boolean indicating if iframe exists
   */
  async hasYoutubeVideo(): Promise<boolean> {
    return await this.elementExists(this.youtubeIframe);
  }

  /**
   * Click the Check Connection button
   */
  async clickCheckConnection(): Promise<void> {
    await this.clickElement(this.checkConnectionButton);
  }

  /**
   * Get the LinkedIn connection result text
   * @returns Promise that resolves to the result text
   */
  async getConnectionResult(): Promise<string | null> {
    // Wait for the result to appear
    await this.waitForElement(this.resultText);
    return await this.getTextContent(this.resultText);
  }

  /**
   * Click the Subscribe to Channel button
   * Note: This will open a new tab
   */
  async clickSubscribe(): Promise<void> {
    await this.clickElement(this.subscribeButton);
  }

  /**
   * Click the Github Repo button
   * Note: This will open a new tab
   */
  async clickGithubRepo(): Promise<void> {
    await this.clickElement(this.githubRepoButton);
  }

  /**
   * Get the footer text
   * @returns Promise that resolves to the footer text
   */
  async getFooterText(): Promise<string | null> {
    return await this.getTextContent(this.footer);
  }
}
