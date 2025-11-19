# Playwright MCP Execution Guide

## What is PLAYWRIGHT_MCP?

PLAYWRIGHT_MCP (Multi-Channel Platform) is an environment variable that enables Playwright to run tests in a more controlled and isolated manner. It helps with:

1. Better resource management
2. Improved stability in CI/CD environments
3. Enhanced reporting capabilities

## How to Use PLAYWRIGHT_MCP

Simply set the environment variable before running your Playwright tests:

```bash
# On Linux/macOS
PLAYWRIGHT_MCP=1 npx playwright test

# On Windows (PowerShell)
$env:PLAYWRIGHT_MCP=1; npx playwright test

# On Windows (CMD)
set PLAYWRIGHT_MCP=1 && npx playwright test
```

## Benefits of Using PLAYWRIGHT_MCP

1. **Improved Stability**: Reduces flakiness in tests by providing a more consistent execution environment
2. **Better Resource Management**: Optimizes resource allocation, especially in CI/CD environments
3. **Enhanced Reporting**: Provides more detailed information in HTML reports
4. **Faster Execution**: Can improve test execution speed in some environments

## HTML Report Generation

When using PLAYWRIGHT_MCP, the HTML report will be automatically generated in the `playwright-report` directory. The report includes:

- Test results summary
- Test execution details
- Screenshots of failed tests
- Trace viewer links (if trace is enabled)
- Performance metrics (if enabled)

To view the report:

```bash
npx playwright show-report
```

## Best Practices

1. Always use PLAYWRIGHT_MCP in CI/CD environments
2. Set appropriate timeouts for your tests
3. Use the retry mechanism for flaky tests
4. Enable trace for failed tests to help with debugging
5. Use the HTML report to analyze test results
