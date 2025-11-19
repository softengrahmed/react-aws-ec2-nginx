# Test Automation for React AWS EC2 Nginx

This directory contains the test automation framework for the React AWS EC2 Nginx project. The framework is built using Playwright and TypeScript, following the Page Object Model design pattern.

## Table of Contents

- [Setup](#setup)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Page Objects](#page-objects)
- [Fixtures](#fixtures)
- [Helpers](#helpers)
- [CI/CD Integration](#cicd-integration)
- [Reports](#reports)

## Setup

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

### Run tests in specific browsers

```bash
npm run test:chromium
npm run test:firefox
```

### Show HTML report

```bash
npm run report
```

## Test Structure

The tests are organized using a feature-based structure:

```
tests/
├── features/
│   ├── home/
│   │   └── home-page.spec.ts
│   ├── navigation/
│   │   └── external-links.spec.ts
│   └── ui/
│       └── visual-elements.spec.ts
├── fixtures/
│   └── test-data.json
├── page-objects/
│   ├── base-page.ts
│   ├── pages/
│   │   └── home-page.ts
│   └── components/
│       ├── header-component.ts
│       └── footer-component.ts
└── helpers/
    ├── assertion-helpers.ts
    └── wait-helpers.ts
```

## Page Objects

The framework follows the Page Object Model design pattern:

- `BasePage`: Contains common methods and utilities for all pages
- `HomePage`: Represents the home page of the application
- Components:
  - `HeaderComponent`: Represents the header component
  - `FooterComponent`: Represents the footer component

## Fixtures

Test data is stored in JSON files in the `fixtures` directory:

- `test-data.json`: Contains test data for the application

## Helpers

Helper utilities are available in the `helpers` directory:

- `assertion-helpers.ts`: Custom assertion methods
- `wait-helpers.ts`: Custom wait methods

## CI/CD Integration

The tests are integrated with GitHub Actions. The workflow is defined in `.github/workflows/test-execution.yaml`.

## Reports

HTML reports are generated after test execution. To view the report:

```bash
npm run report
```

The report will be available in the `playwright-report` directory.
