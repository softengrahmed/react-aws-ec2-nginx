# Contributing to Test Automation

This guide provides instructions for contributing to the test automation suite for the React AWS EC2 Nginx application.

## Table of Contents

- [Code Style](#code-style)
- [Creating New Tests](#creating-new-tests)
- [Page Object Model](#page-object-model)
- [Test Data Management](#test-data-management)
- [Best Practices](#best-practices)
- [Pull Request Process](#pull-request-process)

## Code Style

We use ESLint and Prettier to maintain code quality and consistency:

- Run linting: `npm run lint:e2e`
- Fix linting issues: `npm run lint:e2e:fix`
- Format code: `npm run format:e2e`
- Check formatting: `npm run format:e2e:check`

### TypeScript Guidelines

- Use strict mode
- Avoid using `any` type
- Use proper return types for functions
- Use async/await for asynchronous operations
- Add JSDoc comments for public methods

## Creating New Tests

### Test File Naming

- Test files should be named with the `.spec.ts` extension
- Name should reflect the feature being tested: `feature-name.spec.ts`

### Test Structure

Follow this structure for new tests:

```typescript
import { test, expect } from '@playwright/test';
import { PageObject } from '../../page-objects/pages/page-object';
import testData from '../../fixtures/test-data.json';

test.describe('Feature Name Tests', () => {
  let pageObject: PageObject;

  test.beforeEach(async ({ page }) => {
    pageObject = new PageObject(page);
    // Setup code
  });

  test('should do something specific', async () => {
    // Test code
    // Assertions
  });

  test.afterEach(async () => {
    // Cleanup code
  });
});
```

## Page Object Model

### Creating a New Page Object

1. Create a new file in `tests/page-objects/pages/` named `feature-name-page.ts`
2. Extend the `BasePage` class
3. Define selectors as private readonly properties
4. Implement methods for page-specific actions

Example:

```typescript
import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class FeaturePage extends BasePage {
  // Selectors
  private readonly featureSelector = '.feature-class';
  
  constructor(page: Page) {
    super(page);
  }

  async navigateToFeature(): Promise<void> {
    await this.navigate('/feature');
  }

  async performAction(): Promise<void> {
    await this.clickElement(this.featureSelector);
  }
}
```

### Creating a New Component Object

1. Create a new file in `tests/page-objects/components/` named `component-name-component.ts`
2. Define selectors and methods for the component

Example:

```typescript
import { Page, Locator } from '@playwright/test';

export class FeatureComponent {
  private readonly componentSelector = '.component-class';
  private componentLocator: Locator;

  constructor(private page: Page) {
    this.componentLocator = this.page.locator(this.componentSelector);
  }

  async isComponentVisible(): Promise<boolean> {
    return await this.componentLocator.isVisible();
  }
}
```

## Test Data Management

### Adding New Test Data

1. Add new data to the appropriate JSON file in `tests/fixtures/`
2. Structure data logically by feature or functionality

Example:

```json
{
  "featureData": {
    "expectedTitle": "Feature Title",
    "expectedText": "Feature Description"
  }
}
```

## Best Practices

### General Guidelines

- Keep tests independent and isolated
- Avoid test interdependencies
- Use explicit waits, not fixed timeouts
- Clean up test data after tests
- Use descriptive test and variable names
- Keep tests focused on a single functionality
- Follow the AAA pattern: Arrange, Act, Assert

### Assertions

- Use specific assertions
- Include meaningful error messages
- Assert one concept per test
- Use the assertion helpers when appropriate

### Selectors

- Prefer data-testid attributes for test stability
- Avoid complex CSS or XPath selectors when possible
- Keep selectors in the page objects, not in test files

## Pull Request Process

1. Create a new branch from main
2. Implement your changes following the guidelines
3. Run all tests locally to ensure they pass
4. Submit a pull request with a clear description of changes
5. Address any feedback from code reviews
6. Once approved, your changes will be merged
