# Test Debugging Guide

This guide provides instructions for debugging test failures in the React AWS EC2 Nginx application test suite.

## Table of Contents

- [Common Issues](#common-issues)
- [Debugging Tools](#debugging-tools)
- [Trace Viewer](#trace-viewer)
- [Visual Debugging](#visual-debugging)
- [Logging](#logging)
- [Timeouts](#timeouts)
- [CI/CD Debugging](#cicd-debugging)

## Common Issues

### Element Not Found

**Symptoms:**
- Error: `TimeoutError: waiting for selector '.element' to be visible`

**Possible Causes:**
- Selector is incorrect
- Element is not present in the DOM
- Element is present but not visible
- Page hasn't loaded completely

**Solutions:**
- Verify the selector in the browser's DevTools
- Check if the element is inside an iframe
- Increase the timeout for the action
- Add explicit waits for page loading

### Test Flakiness

**Symptoms:**
- Tests pass sometimes and fail other times
- Inconsistent behavior between runs

**Possible Causes:**
- Race conditions
- Animations or transitions
- Network latency
- Asynchronous operations not properly handled

**Solutions:**
- Add proper waits for conditions, not just elements
- Use `waitForLoadState` to ensure page is fully loaded
- Implement retry logic for flaky operations
- Isolate tests to prevent interference

### Browser Differences

**Symptoms:**
- Tests pass in one browser but fail in another

**Possible Causes:**
- Browser-specific features or behaviors
- CSS differences
- JavaScript compatibility issues

**Solutions:**
- Use browser-agnostic selectors
- Add browser-specific code when necessary
- Test in all target browsers locally before pushing

## Debugging Tools

### Debug Mode

Run tests in debug mode to pause execution at each step:

```bash
npm run test:e2e:debug
```

### Playwright UI Mode

Run tests with the Playwright UI for interactive debugging:

```bash
npm run test:e2e:ui
```

### Playwright Inspector

To open the Playwright Inspector during test execution, add this line to your test:

```typescript
await page.pause();
```

## Trace Viewer

Playwright automatically captures traces on test failures when using the configuration in this project.

### Viewing Traces

To view a trace:

```bash
npm run test:e2e:trace path/to/trace.zip
```

### What's in a Trace

- Screenshots of each action
- DOM snapshots
- Network requests
- Console logs
- Source code

## Visual Debugging

### Screenshots

Take screenshots during test execution:

```typescript
await page.screenshot({ path: 'screenshot.png' });
```

Or use the BasePage helper:

```typescript
await homePage.takeScreenshot('home-page');
```

### Videos

Videos are automatically recorded on test failures. Find them in the `test-results` directory.

## Logging

### Console Logs

Add console logs to your tests for debugging:

```typescript
console.log('Current state:', await page.title());
```

**Note:** Remove console logs before committing code.

### Page Console Events

Capture browser console events:

```typescript
page.on('console', msg => console.log(`BROWSER CONSOLE: ${msg.text()}`));
```

## Timeouts

### Adjusting Timeouts

If tests are timing out, you can adjust timeouts at different levels:

**Global timeout in playwright.config.ts:**
```typescript
timeout: 30 * 1000, // 30 seconds
```

**Per-test timeout:**
```typescript
test('with custom timeout', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // Test code
});
```

**Per-action timeout:**
```typescript
await page.click('.selector', { timeout: 10000 }); // 10 seconds
```

## CI/CD Debugging

### Accessing CI/CD Artifacts

1. Go to the GitHub Actions workflow run
2. Click on the "Artifacts" section
3. Download the playwright-report artifact
4. Extract and open index.html to view the report

### Debugging CI-Only Failures

If tests pass locally but fail in CI:

1. Check environment differences (browser versions, screen size)
2. Review CI logs for errors
3. Add more logging to identify the issue
4. Try to replicate CI conditions locally (headless mode, same browser version)
5. Add retry logic for potentially flaky tests
