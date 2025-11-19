# Contributing to Test Automation

This guide provides instructions for contributing to the test automation framework.

## Table of Contents

- [Code Style](#code-style)
- [Creating New Tests](#creating-new-tests)
- [Creating Page Objects](#creating-page-objects)
- [Best Practices](#best-practices)
- [Pull Request Process](#pull-request-process)

## Code Style

The project uses ESLint and Prettier for code formatting and linting:

- Run linting: `npm run lint`
- Fix linting issues: `npm run lint:fix`
- Format code: `npm run format`
- Check formatting: `npm run format:check`

## Creating New Tests

1. Identify the feature you want to test
2. Create a new file in the appropriate directory under `features/`
3. Follow the AAA pattern (Arrange, Act, Assert)
4. Use page objects for interacting with the UI
5. Use fixtures for test data

Example:

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import testData from '../../fixtures/test-data.json';

test.describe('Feature Name', () => {
  test('should do something specific', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.someAction();
    
    // Assert
    const result = await homePage.getResult();
    expect(result).toBe(testData.expectedValue);
  });
});
```

## Creating Page Objects

1. Identify the page or component you want to create
2. Create a new file in `page-objects/pages/` or `page-objects/components/`
3. Extend `BasePage` for pages
4. Define locators and methods

Example:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page';

export class NewPage extends BasePage {
  // Locators
  readonly someElement: Locator;
  
  constructor(page: Page) {
    super(page, '/new-page');
    this.someElement = page.locator('.some-selector');
  }
  
  async someAction(): Promise<void> {
    await this.clickElement(this.someElement);
  }
  
  async getResult(): Promise<string> {
    return await this.getText(this.someElement);
  }
}
```

## Best Practices

1. **Use Page Objects**: Always use page objects for interacting with the UI
2. **Use Fixtures**: Store test data in fixtures
3. **Explicit Waits**: Use explicit waits instead of implicit waits
4. **Meaningful Assertions**: Write meaningful assertions with clear error messages
5. **Test Independence**: Each test should be independent and not rely on other tests
6. **Clean Up**: Clean up any test data or state after tests
7. **Descriptive Names**: Use descriptive names for tests, methods, and variables
8. **Comments**: Add comments for complex logic
9. **Error Handling**: Handle errors gracefully
10. **Avoid Hardcoded Values**: Use fixtures for test data instead of hardcoding values

## Pull Request Process

1. Create a new branch for your changes
2. Make your changes following the code style guidelines
3. Run tests to ensure they pass
4. Submit a pull request with a clear description of the changes
5. Wait for review and address any feedback
