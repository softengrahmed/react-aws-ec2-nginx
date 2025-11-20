# Debugging Guide for Test Automation

This guide provides strategies and tools for debugging test failures in the Playwright test automation framework.

## Table of Contents

- [Common Issues and Solutions](#common-issues-and-solutions)
- [Debugging Tools](#debugging-tools)
- [Visual Debugging](#visual-debugging)
- [Trace Viewer](#trace-viewer)
- [Console Logging](#console-logging)
- [Timeouts and Waiting](#timeouts-and-waiting)
- [CI/CD Specific Issues](#cicd-specific-issues)

## Common Issues and Solutions

### Element Not Found

**Symptom**: Test fails with "Element not found" or "Timeout waiting for selector"

**Solutions**:
1. Verify the selector is correct
2. Check if the element is in an iframe
3. Ensure the element is not hidden or has display: none
4. Add a wait for the element to be visible

```typescript
// Instead of this
await page.locator('.selector').click();

// Try this
await page.locator('.selector').waitFor({ state: 'visible' });
await page.locator('.selector').click();
```

### Timing Issues

**Symptom**: Tests pass locally but fail in CI, or tests are flaky

**Solutions**:
1. Add explicit waits for conditions
2. Use `waitForSelector` or `waitForLoadState` instead of arbitrary delays
3. Increase timeout for specific actions

```typescript
// Increase timeout for a specific action
await page.locator('.slow-loading-element').click({ timeout: 30000 });

// Wait for network to be idle
await page.waitForLoadState('networkidle');
```

### Application State Issues

**Symptom**: Tests fail because the application is not in the expected state

**Solutions**:
1. Ensure each test sets up its own state
2. Use `beforeEach` to reset application state
3. Implement cleanup after tests

## Debugging Tools

### Using Debug Mode

Run tests in debug mode to pause execution and inspect the state:

```bash
npm run test:debug
```

Or for a specific test:

```bash
npx playwright test features/home/home-page.spec.ts --debug
```

### Using Playwright UI Mode

Playwright UI mode provides a visual interface for running and debugging tests:

```bash
npm run test:ui
```

## Visual Debugging

### Screenshots

Take screenshots during test execution to debug visual issues:

```typescript
// Take a screenshot at a specific point
await page.screenshot({ path: 'debug-screenshot.png' });

// Take a full-page screenshot
await page.screenshot({ path: 'full-page.png', fullPage: true });
```

### Videos

Enable video recording for all tests:

```typescript
// In playwright.config.ts
use: {
  video: 'on-first-retry', // or 'on' to record all tests
}
```

## Trace Viewer

Playwright Trace Viewer is a powerful tool for debugging test failures:

1. Enable tracing in your configuration:

```typescript
// In playwright.config.ts
use: {
  trace: 'on-first-retry', // or 'on' to trace all tests
}
```

2. View the trace after test execution:

```bash
npm run test:trace
```

3. Or open a specific trace file:

```bash
npx playwright show-trace trace.zip
```

## Console Logging

### Logging in Tests

Add console logs to help debug test execution:

```typescript
test('should perform action', async ({ page }) => {
  console.log('Starting test');
  
  await page.goto('/');
  console.log('Page loaded');
  
  const text = await page.locator('h1').textContent();
  console.log('Header text:', text);
  
  // Rest of the test
});
```

### Capturing Browser Console Logs

Capture browser console logs to debug application issues:

```typescript
// Listen for console messages
page.on('console', msg => {
  console.log(`Browser console ${msg.type()}: ${msg.text()}`);
});
```

## Timeouts and Waiting

### Configuring Timeouts

Adjust timeouts in the Playwright configuration:

```typescript
// In playwright.config.ts
export default defineConfig({
  timeout: 30000, // Global timeout for tests
  expect: {
    timeout: 5000, // Timeout for expect assertions
  },
  use: {
    actionTimeout: 15000, // Timeout for Playwright actions
  },
});
```

### Smart Waiting Strategies

Use smart waiting strategies instead of arbitrary delays:

```typescript
// Wait for element to be visible
await page.locator('.selector').waitFor({ state: 'visible' });

// Wait for network to be idle
await page.waitForLoadState('networkidle');

// Wait for a specific response
await page.waitForResponse(response => 
  response.url().includes('/api/data') && response.status() === 200
);

// Wait for a condition to be true
await page.waitForFunction(() => 
  document.querySelector('.loading')?.classList.contains('hidden')
);
```

## CI/CD Specific Issues

### Headless Browser Issues

Some tests may behave differently in headless mode:

1. Try running with headed browser in CI:

```yaml
# In GitHub Actions workflow
- name: Run Playwright tests
  run: npx playwright test --headed
```

2. Adjust viewport size:

```typescript
// In playwright.config.ts
use: {
  viewport: { width: 1280, height: 720 },
}
```

### Resource Constraints

CI environments may have limited resources:

1. Reduce concurrency:

```typescript
// In playwright.config.ts
workers: 1, // Run tests sequentially
```

2. Increase timeouts for CI:

```typescript
// In playwright.config.ts
timeout: process.env.CI ? 60000 : 30000,
```

### Debugging CI Failures

1. Enable verbose logs in CI:

```yaml
# In GitHub Actions workflow
- name: Run Playwright tests
  run: npx playwright test --debug
```

2. Save artifacts for failed tests:

```yaml
# In GitHub Actions workflow
- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```
