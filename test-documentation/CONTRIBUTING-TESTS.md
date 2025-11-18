# Contributing to Test Automation

This guide provides instructions for contributing to the test automation framework for the React AWS EC2 Nginx application.

## Getting Started

1. Make sure you have the required dependencies installed:
   - Node.js 18+
   - npm 8+
   - Git

2. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/softengrahmed/react-aws-ec2-nginx.git
   cd react-aws-ec2-nginx
   npm install
   npx playwright install
   ```

3. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-test-feature
   ```

## Writing Tests

### Test Structure

Tests should follow this structure:
1. Import required modules and page objects
2. Set up test data and state
3. Perform actions
4. Assert expected outcomes
5. Clean up (if necessary)

### Example Test

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import testData from '../../fixtures/test-data.json';

test.describe('Feature Name', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should perform expected behavior', async ({ page }) => {
    // Arrange - set up test conditions
    const expectedText = testData.someValue;
    
    // Act - perform actions
    await homePage.performSomeAction();
    
    // Assert - verify outcomes
    const actualText = await homePage.getSomeText();
    expect(actualText).toBe(expectedText);
  });
});
```

### Creating Page Objects

1. Create a new file in `tests/page-objects/pages/` for page classes or `tests/page-objects/components/` for component classes
2. Extend the BasePage class for pages
3. Define selectors at the top of the class
4. Implement methods for actions and assertions

Example:
```typescript
import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class NewFeaturePage extends BasePage {
  // Selectors
  readonly featureButtonSelector: string = '#feature-button';
  readonly featureTextSelector: string = '.feature-text';

  constructor(page: Page) {
    super(page);
  }

  async navigateToFeature(): Promise<void> {
    await this.navigate('/feature');
  }

  async clickFeatureButton(): Promise<void> {
    await this.clickElement(this.featureButtonSelector);
  }

  async getFeatureText(): Promise<string> {
    return await this.getElementText(this.featureTextSelector);
  }
}
```

### Adding Test Data

1. Add new test data to the appropriate fixture file in `tests/fixtures/`
2. For new types of test data, create a new JSON file

## Code Style Guidelines

1. Use TypeScript's strict mode
2. Follow the ESLint and Prettier configurations
3. Use meaningful variable and function names
4. Add JSDoc comments to functions and classes
5. Keep functions small and focused on a single task
6. Use the Page Object Model pattern consistently

## Pull Request Process

1. Ensure all tests pass locally
2. Run linting and formatting checks:
   ```bash
   npm run lint:e2e
   npm run format:e2e:check
   ```

3. Fix any issues:
   ```bash
   npm run lint:e2e:fix
   npm run format:e2e
   ```

4. Push your changes and create a pull request
5. Include a clear description of the changes and any testing considerations

## Best Practices

1. **Test Independence**: Each test should be independent and not rely on the state from other tests
2. **Descriptive Names**: Use descriptive test names that explain the behavior being tested
3. **Avoid Flakiness**: Use reliable selectors and proper waiting strategies
4. **Maintainability**: Keep tests and page objects maintainable by following DRY principles
5. **Test Data**: Use fixture files for test data instead of hardcoding values
6. **Error Messages**: Include meaningful error messages in assertions
7. **Timeouts**: Avoid hardcoded waits, use explicit waits instead
8. **Screenshots**: Take screenshots for debugging when appropriate
9. **Clean Up**: Clean up any test data or state after tests
10. **Documentation**: Document complex test scenarios and page objects
