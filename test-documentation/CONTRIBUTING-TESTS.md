# Contributing to Test Automation

Thank you for contributing to our test automation suite! This guide will help you write high-quality, maintainable tests.

## 📜 Table of Contents

- [Getting Started](#getting-started)
- [Test Writing Guidelines](#test-writing-guidelines)
- [Page Object Model](#page-object-model)
- [Best Practices](#best-practices)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)

## Getting Started

### Setup Your Development Environment

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install`
4. Run existing tests to ensure setup: `npm test`

### Understanding the Test Structure

```
tests/
├── e2e/
│   ├── smoke/       # Quick health checks (< 5 min)
│   ├── critical/    # Core functionality (5-10 min)
│   └── regression/  # Comprehensive suite (15-20 min)
```

## Test Writing Guidelines

### 1. Test Organization

#### Smoke Tests
- **Purpose**: Quick health checks
- **Duration**: < 1 minute per test
- **Scope**: Critical paths only
- **Example**: Application loads, key elements visible

```typescript
test('should load application', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/React App/);
});
```

#### Critical Tests
- **Purpose**: Core functionality validation
- **Duration**: 1-3 minutes per test
- **Scope**: Must-work features
- **Example**: User can navigate, forms work

```typescript
test('should display all critical UI elements', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.assertPageLoaded();
});
```

#### Regression Tests
- **Purpose**: Comprehensive coverage
- **Duration**: Any duration
- **Scope**: All features, edge cases
- **Example**: Layout integrity, performance metrics

### 2. Test Structure (AAA Pattern)

Follow the Arrange-Act-Assert pattern:

```typescript
test('descriptive test name', async ({ page }) => {
  // Arrange - Set up test data and state
  const homePage = new HomePage(page);
  const testUser = DataHelper.generateUser();
  
  // Act - Perform the action being tested
  await homePage.goto();
  await homePage.clickLearnReactLink();
  
  // Assert - Verify the expected outcome
  await expect(page).toHaveURL(/reactjs.org/);
});
```

### 3. Test Naming Convention

Use descriptive names that clearly state what is being tested:

✅ **Good**:
```typescript
test('should display error message when form is submitted with invalid email');
test('should navigate to dashboard after successful login');
test('should load page within 3 seconds');
```

❌ **Bad**:
```typescript
test('test1');
test('check form');
test('it works');
```

### 4. Using Page Object Model

Always use Page Objects for UI interactions:

```typescript
// ❌ Bad - Direct interaction
test('bad example', async ({ page }) => {
  await page.click('.App-logo');
  await page.fill('#input', 'text');
});

// ✅ Good - Using Page Object
test('good example', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickLearnReactLink();
});
```

### 5. Creating New Page Objects

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page';

/**
 * LoginPage - Represents the login page
 */
export class LoginPage extends BasePage {
  // Declare locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await this.navigate('/login');
    await this.waitForPageLoad();
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }
}
```

## Best Practices

### 1. Test Independence

Each test should be independent and not rely on other tests:

```typescript
// ✅ Good - Each test is independent
test('test 1', async ({ page }) => {
  await page.goto('/');
  // Test logic
});

test('test 2', async ({ page }) => {
  await page.goto('/');
  // Test logic
});

// ❌ Bad - Tests depend on execution order
let sharedState;

test('test 1', async ({ page }) => {
  sharedState = await page.evaluate(() => something);
});

test('test 2', async ({ page }) => {
  // Uses sharedState from test 1
});
```

### 2. Explicit Waits Over Hard Waits

```typescript
// ❌ Bad - Hard wait
await page.waitForTimeout(5000);

// ✅ Good - Wait for specific condition
await page.waitForLoadState('networkidle');
await WaitHelper.waitForVisible(element);
await expect(element).toBeVisible();
```

### 3. Use Web-First Assertions

```typescript
// ❌ Bad - Non-web-first assertion
const text = await element.textContent();
expect(text).toBe('Hello');

// ✅ Good - Web-first assertion
await expect(element).toHaveText('Hello');
```

### 4. Handle Dynamic Content

```typescript
// Use flexible locators
const dynamicElement = page.getByRole('button', { name: /submit/i });

// Wait for content to stabilize
await page.waitForLoadState('networkidle');
```

### 5. Test Data Management

```typescript
// Use fixtures for static data
import users from '../fixtures/users.json';
const testUser = users[0];

// Use factories for dynamic data
import { DataHelper } from '../helpers/data-helpers';
const randomUser = DataHelper.generateUser();
```

### 6. Error Handling

```typescript
test('should handle errors gracefully', async ({ page }) => {
  try {
    await page.goto('/invalid-url');
  } catch (error) {
    // Verify error is handled appropriately
    expect(error).toBeTruthy();
  }
});
```

### 7. Custom Assertions

Use custom assertion helpers for better readability:

```typescript
import { AssertionHelper } from '../helpers/assertion-helpers';

// Instead of multiple expect statements
await AssertionHelper.assertAllVisible([element1, element2, element3]);
```

## Code Style

### TypeScript Strict Mode

- Enable strict mode in `tsconfig.json`
- No implicit `any` types
- Strict null checks

### ESLint and Prettier

```bash
# Check linting
npm run lint:tests

# Fix linting issues
npm run lint:tests:fix

# Format code
npm run format:tests
```

### JSDoc Comments

Add JSDoc comments for all public methods:

```typescript
/**
 * Navigate to the home page and verify it loads
 * @throws {Error} If page fails to load within timeout
 */
async goto(): Promise<void> {
  await this.navigate('/');
  await this.waitForPageLoad();
}
```

### File Naming

- Test files: `feature-name.spec.ts`
- Page objects: `page-name-page.ts`
- Components: `component-name-component.ts`
- Helpers: `purpose-helpers.ts`

## Pull Request Process

### 1. Before Submitting

- [ ] All tests pass locally
- [ ] New tests follow Page Object Model
- [ ] Code is formatted (run `npm run format:tests`)
- [ ] Code passes linting (run `npm run lint:tests`)
- [ ] Added JSDoc comments for new methods
- [ ] Updated documentation if needed

### 2. PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New test suite
- [ ] Bug fix in existing tests
- [ ] New page object
- [ ] Helper utility
- [ ] Documentation update

## Test Coverage
- Tests added: X
- Tests modified: Y
- Test coverage: Z%

## Checklist
- [ ] Tests pass locally
- [ ] Follows coding standards
- [ ] Documentation updated
```

### 3. Review Process

Tests will be reviewed for:
- Code quality and readability
- Test coverage and assertions
- Following Page Object Model
- Performance impact
- Maintenance concerns

## Common Pitfalls to Avoid

1. **Flaky Tests**: Avoid time-dependent assertions
2. **Over-Complicated Tests**: Keep tests simple and focused
3. **Test Pollution**: Clean up after tests
4. **Hard-Coded Values**: Use fixtures or data generators
5. **Testing Implementation Details**: Test behavior, not implementation

## Questions?

If you have questions about contributing:
1. Check the [Debugging Guide](./DEBUGGING-GUIDE.md)
2. Review existing tests for examples
3. Create a GitHub issue with your question

Thank you for contributing! 🚀
