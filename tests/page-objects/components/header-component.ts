import { Page, Locator } from '@playwright/test';

/**
 * HeaderComponent - Reusable header component
 * Can be used across multiple pages that share the same header
 */
export class HeaderComponent {
  private page: Page;
  private readonly headerContainer: Locator;
  private readonly logo: Locator;
  private readonly navigationLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerContainer = page.locator('.App-header');
    this.logo = page.locator('.App-logo');
    this.navigationLinks = page.locator('nav a');
  }

  /**
   * Check if header is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.headerContainer.isVisible();
  }

  /**
   * Get all navigation link texts
   */
  async getNavigationLinks(): Promise<string[]> {
    const count = await this.navigationLinks.count();
    const links: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const text = await this.navigationLinks.nth(i).textContent();
      if (text) links.push(text);
    }
    
    return links;
  }

  /**
   * Click on a navigation link by text
   * @param linkText - Text of the link to click
   */
  async clickNavigationLink(linkText: string): Promise<void> {
    await this.navigationLinks.filter({ hasText: linkText }).click();
  }

  /**
   * Check if logo is visible
   */
  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }
}
