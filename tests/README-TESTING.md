# Test Automation with Playwright

This directory contains the test automation framework for the React AWS EC2 Nginx application using Playwright.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Page Object Model](#page-object-model)
- [Test Data Management](#test-data-management)
- [CI/CD Integration](#cicd-integration)
- [Reporting](#reporting)
- [Troubleshooting](#troubleshooting)

## Overview

This test automation framework is built using Playwright with TypeScript. It follows the Page Object Model (POM) design pattern and uses a feature-based organization structure for tests.

### Key Features

- **TypeScript Support**: Strong typing and better code organization
- **Page Object Model**: Separation of test logic from page interactions
- **Feature-based Organization**: Tests organized by application features
- **Static Test Data**: JSON fixtures for test data
- **HTML Reporting**: Comprehensive test reports
- **Auto-retry**: Automatic retry on test failures
- **CI/CD Integration**: GitHub Actions workflow for automated test execution

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Navigate to the tests directory:
   ```bash
   cd tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Test Structure

The test framework follows a feature-based organization:

```
tests/
├── features/            # Test files organized by feature
│   ├── home/            # Home page tests
│   └── smoke/           # Smoke tests
├── fixtures/            # Test data in JSON format
├── page-objects/        # Page Object Model classes
│   ├── pages/           # Page classes
│   ├── components/      # Reusable component classes
│   └── base-page.ts     # Base page class
├── helpers/             # Helper utilities
└── playwright.config.ts # Playwright configuration
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in headed mode (with browser visible)

```bash
npm run test:headed
```

### Run tests with Playwright UI

```bash
npm run test:ui
```

### Run tests in debug mode

```bash
npm run test:debug
```

### Run specific test files

```bash
npx playwright test features/home/home-page.spec.ts
```

### Run smoke tests

```bash
npm run test:smoke
```

## Page Object Model

The framework uses the Page Object Model design pattern to separate test logic from page interactions:

- **BasePage**: Contains common methods for all pages
- **Page Classes**: Extend BasePage and contain page-specific selectors and methods
- **Component Classes**: Represent reusable UI components

Example usage:

```typescript
import { test } from '@playwright/test';
import { HomePage } from '../page-objects/pages/home-page';

test('should display the correct title', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.expectElementToContainText('h1', 'Welcome');
});
```

## Test Data Management

Test data is managed using static JSON fixtures located in the `fixtures` directory:

- `users.json`: User data for testing
- `test-data.json`: General test data

Example usage:

```typescript
import testData from '../fixtures/test-data.json';

test('should display the correct title', async ({ page }) => {
  await expect(page.locator('h1')).toContainText(testData.appTitle);
});
```

## CI/CD Integration

Tests are automatically executed using GitHub Actions:

- On push to the main branch
- On pull requests to the main branch

The workflow configuration is located in `.github/workflows/test-execution.yaml`.

## Reporting

Test results are available as HTML reports after test execution:

```bash
npm run test:report
```

This will open the HTML report in your default browser.

## Troubleshooting

### Common Issues

1. **Tests failing due to timeouts**:
   - Check if the application is running correctly
   - Increase timeout in the test configuration

2. **Element not found errors**:
   - Verify selectors in the page objects
   - Check if the application UI has changed

3. **CI failures but tests pass locally**:
   - Check for environment-specific issues
   - Ensure all dependencies are correctly installed in CI

### Debugging Tips

1. Use the debug mode:
   ```bash
   npm run test:debug
   ```

2. Add screenshots for failing tests:
   ```typescript
   await page.screenshot({ path: 'debug.png' });
   ```

3. Use Playwright Trace Viewer:
   ```bash
   npm run test:trace
   ```
