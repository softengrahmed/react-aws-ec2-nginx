import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page';

/**
 * HomePage - Represents the home/landing page of the React application
 */
export class HomePage extends BasePage {
  // Locators
  private readonly appLogo: Locator;
  private readonly appHeader: Locator;
  private readonly learnReactLink: Locator;
  private readonly editMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.appLogo = page.locator('.App-logo');
    this.appHeader = page.locator('.App-header');
    this.learnReactLink = page.getByRole('link', { name: /learn react/i });
    this.editMessage = page.getByText(/Edit/i);
  }

  /**
   * Navigate to home page
   */
  async goto(): Promise<void> {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  /**
   * Check if the React logo is visible
   */
  async isLogoVisible(): Promise<boolean> {
    return await this.isVisible(this.appLogo);
  }

  /**
   * Get the main header text
   */
  async getHeaderText(): Promise<string> {
    return await this.getTextContent(this.appHeader);
  }

  /**
   * Click on the Learn React link
   */
  async clickLearnReactLink(): Promise<void> {
    await this.clickElement(this.learnReactLink);
  }

  /**
   * Check if the edit message is visible
   */
  async isEditMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.editMessage);
  }

  /**
   * Assert that the home page has loaded correctly
   */
  async assertPageLoaded(): Promise<void> {
    await this.assertElementVisible(this.appLogo, 'App logo should be visible');
    await this.assertElementVisible(this.appHeader, 'App header should be visible');
  }

  /**
   * Get Learn React link href attribute
   */
  async getLearnReactLinkHref(): Promise<string | null> {
    await this.waitForElement(this.learnReactLink);
    return await this.learnReactLink.getAttribute('href');
  }

  /**
   * Check if logo is rotating (has animation class)
   */
  async isLogoAnimated(): Promise<boolean> {
    const className = await this.appLogo.getAttribute('class');
    return className?.includes('App-logo-spin') || false;
  }
}
