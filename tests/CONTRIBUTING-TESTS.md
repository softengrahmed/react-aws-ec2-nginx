# Contributing to Test Automation

This guide provides instructions for contributing to the test automation framework for the React AWS EC2 Nginx application.

## Table of Contents

- [Getting Started](#getting-started)
- [Coding Standards](#coding-standards)
- [Creating New Tests](#creating-new-tests)
- [Page Object Model](#page-object-model)
- [Test Data Management](#test-data-management)
- [Pull Request Process](#pull-request-process)
- [Best Practices](#best-practices)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/softengrahmed/react-aws-ec2-nginx.git
   cd react-aws-ec2-nginx
   ```

2. Install dependencies:
   ```bash
   cd tests
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

4. Run tests to verify setup:
   ```bash
   npm test
   ```

## Coding Standards

This project follows strict TypeScript and code formatting standards:

- **TypeScript**: Strict mode enabled
- **ESLint**: For code quality
- **Prettier**: For code formatting

### Linting and Formatting

- Check linting issues:
  ```bash
  npm run lint
  ```

- Fix linting issues:
  ```bash
  npm run lint:fix
  ```

- Format code:
  ```bash
  npm run format
  ```

## Creating New Tests

### Test File Naming

- Test files should be named with the `.spec.ts` extension
- Name should reflect the feature being tested: `feature-name.spec.ts`

### Test Structure

Follow the Arrange-Act-Assert (AAA) pattern:

```typescript
test('should perform specific action', async ({ page }) => {
  // Arrange
  const homePage = new HomePage(page);
  
  // Act
  await homePage.goto();
  await homePage.clickButton();
  
  // Assert
  await expect(page.locator('.result')).toContainText('Success');
});
```

### Test Organization

Place tests in the appropriate feature directory:

```
tests/features/[feature-name]/[test-name].spec.ts
```

## Page Object Model

### Creating a New Page Object

1. Create a new file in `page-objects/pages/` directory:

```typescript
// page-objects/pages/new-feature-page.ts
import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class NewFeaturePage extends BasePage {
  // Selectors
  readonly pageTitle = 'h1.feature-title';
  readonly submitButton = 'button[type="submit"]';
  
  constructor(page: Page) {
    super(page, '/new-feature');
  }
  
  async submitForm(): Promise<void> {
    await this.clickElement(this.submitButton);
  }
}
```

### Creating a Component Object

For reusable UI components:

```typescript
// page-objects/components/navigation-component.ts
import { Page, Locator } from '@playwright/test';

export class NavigationComponent {
  readonly page: Page;
  readonly container: Locator;
  readonly homeLink: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('nav.main-navigation');
    this.homeLink = this.container.locator('a[href="/"]');
  }
  
  async navigateToHome(): Promise<void> {
    await this.homeLink.click();
  }
}
```

## Test Data Management

### Adding New Test Data

Add new test data to the appropriate JSON file in the `fixtures` directory:

```json
// fixtures/new-feature-data.json
{
  "testCases": [
    {
      "id": 1,
      "input": "Test Input",
      "expectedOutput": "Expected Result"
    }
  ]
}
```

### Using Test Data

```typescript
import testData from '../../fixtures/new-feature-data.json';

test('should process input correctly', async ({ page }) => {
  const newFeaturePage = new NewFeaturePage(page);
  await newFeaturePage.goto();
  await newFeaturePage.enterInput(testData.testCases[0].input);
  await expect(page.locator('.result')).toContainText(testData.testCases[0].expectedOutput);
});
```

## Pull Request Process

1. Create a feature branch:
   ```bash
   git checkout -b feature/new-test-feature
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat(test): Add tests for new feature"
   ```

3. Push your branch:
   ```bash
   git push origin feature/new-test-feature
   ```

4. Create a pull request with a clear description of the changes

5. Ensure all CI checks pass

## Best Practices

### General Guidelines

1. **Keep tests independent**: Each test should be able to run in isolation
2. **Avoid test interdependencies**: Don't rely on the state from previous tests
3. **Use descriptive test names**: Test names should clearly describe what is being tested
4. **Follow the AAA pattern**: Arrange, Act, Assert
5. **Minimize duplication**: Use page objects and helper functions

### Selectors

1. **Prefer data attributes**: Use `data-testid` attributes when possible
2. **Avoid brittle selectors**: Don't rely on CSS classes that might change
3. **Use specific selectors**: Be as specific as possible to avoid future conflicts

### Assertions

1. **Assert one thing per test**: Focus each test on a specific behavior
2. **Use explicit assertions**: Be clear about what you're testing
3. **Use appropriate matchers**: Choose the right matcher for the assertion

### Performance

1. **Minimize browser actions**: Reduce the number of interactions with the browser
2. **Use waitForSelector instead of delays**: Avoid arbitrary waits
3. **Group related tests**: Use test.describe to group related tests
