# Test Automation Framework

This document provides an overview of the test automation framework for the React AWS EC2 Nginx application.

## Overview

This test automation framework is built using Playwright, a modern end-to-end testing framework for web applications. The framework follows the Page Object Model (POM) design pattern and is organized in a feature-based structure.

## Technology Stack

- **Playwright**: Modern end-to-end testing framework
- **TypeScript**: Strongly typed programming language
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **GitHub Actions**: CI/CD integration

## Prerequisites

- Node.js 18 or higher
- npm 8 or higher

## Setup Instructions

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

### Run all tests:
```bash
npm run test:e2e
```

### Run tests in headed mode (with browser UI):
```bash
npm run test:e2e:headed
```

### Run tests with Playwright UI:
```bash
npm run test:e2e:ui
```

### Run tests in debug mode:
```bash
npm run test:e2e:debug
```

### Run tests in specific browsers:
```bash
npm run test:e2e:chromium
npm run test:e2e:firefox
```

### View HTML report:
```bash
npm run test:e2e:report
```

## Project Structure

```
tests/
├── features/           # Feature-based test files
│   ├── home/           # Home page feature tests
│   │   └── home-page.spec.ts
├── fixtures/           # Test data files
│   ├── users.json
│   └── test-data.json
├── page-objects/       # Page Object Model classes
│   ├── base-page.ts    # Base page class
│   ├── pages/          # Page classes
│   │   └── home-page.ts
│   └── components/     # Component classes
│       └── header-component.ts
└── helpers/            # Helper utilities
    ├── assertion-helpers.ts
    └── wait-helpers.ts
```

## Configuration

The main Playwright configuration is in `playwright.config.ts`. This includes:

- Browser configurations
- Timeout settings
- Reporter configuration
- Screenshot and trace settings
- Retry settings

## Test Data Management

Test data is managed using static JSON fixtures located in the `tests/fixtures` directory. These files contain test data that can be imported and used in tests.

## CI/CD Integration

Tests are automatically run on GitHub Actions when:
- Code is pushed to the main branch
- A pull request is opened against the main branch

The workflow configuration is in `.github/workflows/test-execution.yaml`.

## Best Practices

1. Follow the Page Object Model pattern
2. Keep tests independent and isolated
3. Use descriptive test and function names
4. Avoid hardcoded waits, use smart waits instead
5. Maintain test data in fixture files
6. Add meaningful assertions with custom messages
7. Take screenshots on test failures
