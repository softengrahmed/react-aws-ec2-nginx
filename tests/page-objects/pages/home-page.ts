import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

/**
 * Home page object representing the main landing page
 * Contains selectors and methods specific to the home page
 */
export class HomePage extends BasePage {
  // Selectors
  private readonly appLogoSelector = '.App-logo';
  private readonly appHeaderSelector = '.App-header';
  private readonly appLinkSelector = '.App-link';
  
  /**
   * Constructor for the HomePage class
   * @param page - Playwright Page object
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
   * @returns The header text content
   */
  async getHeaderText(): Promise<string> {
    return await this.getElementText(this.appHeaderSelector);
  }

  /**
   * Click on the "Learn React" link
   */
  async clickLearnReactLink(): Promise<void> {
    await this.clickElement(this.appLinkSelector);
  }

  /**
   * Get the URL of the "Learn React" link
   * @returns The href attribute of the link
   */
  async getLearnReactLinkUrl(): Promise<string> {
    const linkLocator = this.page.locator(this.appLinkSelector);
    return await linkLocator.getAttribute('href') || '';
  }

  /**
   * Check if the page has loaded completely
   * @returns True if the page has loaded, false otherwise
   */
  async isPageLoaded(): Promise<boolean> {
    const logoVisible = await this.isLogoVisible();
    const headerText = await this.getHeaderText();
    return logoVisible && headerText.length > 0;
  }
}
