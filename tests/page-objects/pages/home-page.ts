import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

/**
 * HomePage class representing the home page of the application
 * Contains selectors and methods specific to the home page
 */
export class HomePage extends BasePage {
  // Selectors
  readonly appLogoSelector: string = '.App-logo';
  readonly appHeaderSelector: string = '.App-header';
  readonly appLinkSelector: string = '.App-link';

  /**
   * Constructor for the HomePage
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the home page
   */
  async navigateToHome(): Promise<void> {
    await this.navigate('/');
  }

  /**
   * Check if the React logo is visible
   * @returns True if the logo is visible, false otherwise
   */
  async isLogoVisible(): Promise<boolean> {
    return await this.isElementVisible(this.appLogoSelector);
  }

  /**
   * Get the header text from the home page
   * @returns The text content of the header
   */
  async getHeaderText(): Promise<string> {
    return await this.getElementText(this.appHeaderSelector);
  }

  /**
   * Click on the React learn link
   */
  async clickLearnReactLink(): Promise<void> {
    await this.clickElement(this.appLinkSelector);
  }

  /**
   * Assert that the home page is loaded correctly
   */
  async assertHomePageLoaded(): Promise<void> {
    await this.assertElementText(this.appHeaderSelector, 'React');
    await this.isElementVisible(this.appLogoSelector);
  }
}
