# Test Automation Guide

## 🚀 Quick Start

This guide will help you get started with the Playwright test automation framework for the React AWS EC2 Nginx application.

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git
- Basic understanding of TypeScript and Playwright

### Installation

```bash
# Clone the repository
git clone https://github.com/softengrahmed/react-aws-ec2-nginx.git
cd react-aws-ec2-nginx

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install system dependencies (Linux only)
npx playwright install-deps
```

### Running Tests

#### Run All Tests
```bash
npm test
```

#### Run Tests in UI Mode (Recommended for Development)
```bash
npm run test:ui
```

#### Run Specific Test Suites
```bash
# Smoke tests (quick health checks)
npm run test:smoke

# Critical tests (core functionality)
npm run test:critical

# Regression tests (comprehensive suite)
npm run test:regression
```

#### Run Tests on Specific Browsers
```bash
# Chromium only
npm run test:chromium

# Firefox only
npm run test:firefox

# WebKit (Safari) only
npm run test:webkit

# Mobile browsers
npm run test:mobile
```

#### Run Tests in Different Environments
```bash
# Staging environment
npm run test:staging

# Production environment (smoke tests only)
npm run test:prod
```

#### Debug Tests
```bash
# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Open Playwright Inspector
npm run test:ui
```

### Viewing Reports

#### View HTML Report
```bash
npm run test:report
```

#### View Trace Files
```bash
npm run test:trace
```

Reports are generated in `tests/reports/` directory.

## 🏭 Project Structure

```
react-aws-ec2-nginx/
├── tests/
│   ├── e2e/
│   │   ├── smoke/              # Quick health check tests
│   │   ├── critical/           # Critical functionality tests
│   │   └── regression/         # Comprehensive test suite
│   ├── page-objects/
│   │   ├── base-page.ts        # Base class for all pages
│   │   ├── pages/              # Page object implementations
│   │   └── components/         # Reusable component objects
│   ├── helpers/
│   │   ├── api-helpers.ts      # API testing utilities
│   │   ├── data-helpers.ts     # Test data generation
│   │   ├── assertion-helpers.ts # Custom assertions
│   │   └── wait-helpers.ts     # Wait strategies
│   ├── fixtures/              # Static test data
│   └── config/                # Environment configurations
├── playwright-config/        # Playwright configurations
├── .github/workflows/        # CI/CD pipelines
└── test-documentation/       # Test documentation
```

## 📚 Key Concepts

### Page Object Model (POM)

All UI interactions are encapsulated in Page Objects:

```typescript
import { HomePage } from './page-objects/pages/home-page';

test('example test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.assertPageLoaded();
});
```

### Helper Utilities

Use helper classes for common operations:

```typescript
import { AssertionHelper } from './helpers/assertion-helpers';
import { WaitHelper } from './helpers/wait-helpers';
import { DataHelper } from './helpers/data-helpers';

// Custom assertions
await AssertionHelper.assertAllVisible([element1, element2]);

// Smart waits
await WaitHelper.waitForNetworkIdle(page);

// Generate test data
const user = DataHelper.generateUser();
```

### Test Fixtures

Static test data is stored in `tests/fixtures/`:

```typescript
import testData from './fixtures/test-data.json';
import users from './fixtures/users.json';
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
BASE_URL=http://localhost:3000
STAGING_URL=https://staging.example.com
PROD_URL=https://production.example.com
```

### Playwright Configuration

Main configuration: `playwright-config/playwright.config.ts`

Environment-specific configs:
- `playwright.staging.config.ts`
- `playwright.prod.config.ts`

## ⚙️ Advanced Features

### Parallel Execution

Tests run in parallel by default (4 workers in CI).

### Automatic Retries

- CI: 2 retries on failure
- Local: No retries (for faster feedback)

### Screenshot & Video Capture

- Screenshots: Captured on failure
- Videos: Recorded on failure
- Traces: Recorded on failure

### Flaky Test Detection

Tests are automatically retried to detect flakiness.

## 🐛 Troubleshooting

### Common Issues

1. **Tests fail locally but pass in CI**
   - Ensure you have the latest browsers installed
   - Run `npx playwright install`

2. **Timeout errors**
   - Increase timeout in `playwright.config.ts`
   - Check network connectivity

3. **Element not found**
   - Use Playwright Inspector: `npm run test:debug`
   - Check if selectors have changed

4. **Flaky tests**
   - Use smart waits instead of hard waits
   - Ensure proper test isolation

### Debug Tools

- **Playwright Inspector**: `npm run test:debug`
- **Trace Viewer**: `npm run test:trace`
- **UI Mode**: `npm run test:ui`
- **VS Code Extension**: Playwright Test for VSCode

## 📝 Writing Tests

See [CONTRIBUTING-TESTS.md](./CONTRIBUTING-TESTS.md) for guidelines on writing new tests.

## 🔗 Useful Links

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Test Strategy](./TEST-STRATEGY.md)
- [Debugging Guide](./DEBUGGING-GUIDE.md)

## 📞 Support

For questions or issues:
1. Check the [Debugging Guide](./DEBUGGING-GUIDE.md)
2. Review existing issues on GitHub
3. Create a new issue with detailed information
