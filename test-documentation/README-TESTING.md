# Test Automation Guide

This document provides instructions for setting up and running the automated tests for the React AWS EC2 Nginx application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Page Object Model](#page-object-model)
- [Test Data](#test-data)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18 or higher
- npm 8 or higher
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/softengrahmed/react-aws-ec2-nginx.git
   cd react-aws-ec2-nginx
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests

```bash
npm run test:e2e
```

### Run tests in headed mode (with browser visible)

```bash
npm run test:e2e:headed
```

### Run tests with Playwright UI

```bash
npm run test:e2e:ui
```

### Run tests in debug mode

```bash
npm run test:e2e:debug
```

### Run tests in specific browsers

```bash
# Run in Chromium only
npm run test:e2e:chromium

# Run in Firefox only
npm run test:e2e:firefox
```

### View HTML report

```bash
npm run test:e2e:report
```

## Test Structure

The tests are organized using a feature-based structure:

```
tests/
├── features/
│   ├── home/
│   │   └── home-page.spec.ts
│   └── navigation/
│       └── navigation.spec.ts
├── fixtures/
│   └── test-data.json
├── page-objects/
│   ├── base-page.ts
│   ├── pages/
│   │   └── home-page.ts
│   └── components/
│       └── header-component.ts
└── helpers/
    ├── assertion-helpers.ts
    └── wait-helpers.ts
```

## Page Object Model

The tests use the Page Object Model (POM) design pattern to create an abstraction layer for the UI. This makes tests more maintainable and readable.

### Base Page

The `BasePage` class provides common functionality for all page objects:

```typescript
// Example usage
const homePage = new HomePage(page);
await homePage.navigateToHome();
await homePage.assertPageTitle('React App');
```

### Page Classes

Each page in the application has its own page class that extends the `BasePage`:

```typescript
// Example usage
const homePage = new HomePage(page);
const isLogoVisible = await homePage.isLogoVisible();
```

### Component Classes

Reusable UI components have their own classes:

```typescript
// Example usage
const headerComponent = new HeaderComponent(page);
const headerText = await headerComponent.getHeaderText();
```

## Test Data

Test data is stored in JSON files in the `tests/fixtures` directory:

```typescript
// Example usage
import testData from '../../fixtures/test-data.json';
expect(headerText).toBe(testData.homePageData.expectedHeaderText);
```

## CI/CD Integration

Tests are automatically run on GitHub Actions when:
- Code is pushed to the main branch
- A pull request is created against the main branch

The workflow configuration is in `.github/workflows/test-execution.yaml`.

## Troubleshooting

### Tests are failing in CI but pass locally

- Check for environment-specific issues
- Ensure all dependencies are installed in CI
- Check for timing issues or race conditions

### Browser not found

If you get an error about browsers not being found:

```bash
npx playwright install
```

### Timeout errors

If tests are timing out:

- Check network connectivity
- Increase timeout values in the test configuration
- Check if the application is running and accessible
