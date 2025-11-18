# Debugging Guide

This guide provides instructions for debugging test failures and issues in the test automation framework.

## Table of Contents

- [Common Issues](#common-issues)
- [Debugging Tools](#debugging-tools)
- [Debugging Strategies](#debugging-strategies)
- [Troubleshooting Specific Issues](#troubleshooting-specific-issues)

## Common Issues

### Element Not Found

**Symptoms**: Test fails with "Element not found" or "Timeout waiting for element" error.

**Solutions**:
1. Check if the selector is correct
2. Add explicit waits for the element
3. Check if the element is in an iframe
4. Check if the element is dynamically loaded

### Test Flakiness

**Symptoms**: Tests pass sometimes and fail other times.

**Solutions**:
1. Add explicit waits
2. Use more reliable selectors
3. Check for race conditions
4. Increase timeouts for slow operations

### Browser Crashes

**Symptoms**: Browser crashes during test execution.

**Solutions**:
1. Update Playwright
2. Check for memory leaks
3. Reduce the number of parallel tests
4. Check for browser-specific issues

## Debugging Tools

### Playwright Debug Mode

Run tests in debug mode:

```bash
npm run test:debug
```

This will open the browser and pause execution at the beginning of the test.

### Playwright UI Mode

Run tests with Playwright UI:

```bash
npm run test:ui
```

This will open the Playwright UI, which allows you to:
- See test execution in real-time
- Inspect elements
- View network requests
- View console logs

### Playwright Trace Viewer

Generate and view traces:

```bash
# Run tests with tracing enabled
npx playwright test --trace on

# View the trace
npm run test:trace
```

### Screenshots and Videos

Screenshots are automatically taken on test failure. You can also take screenshots manually:

```typescript
await page.screenshot({ path: 'screenshot.png' });
```

## Debugging Strategies

### Isolate the Issue

Run the failing test in isolation:

```bash
npx playwright test path/to/test.spec.ts
```

### Step-by-Step Execution

Add `await page.pause()` at strategic points in your test to pause execution and inspect the state.

### Console Logs

Add console logs to your test:

```typescript
console.log('Current URL:', page.url());
```

### Increase Timeouts

Increase timeouts for specific operations:

```typescript
await page.waitForSelector('.selector', { timeout: 10000 });
```

## Troubleshooting Specific Issues

### Issue: Test works locally but fails in CI

**Possible causes**:
1. Different browser versions
2. Different screen resolutions
3. Network issues
4. Timing issues

**Solutions**:
1. Use the same browser version in CI and locally
2. Set a consistent viewport size
3. Mock network requests if necessary
4. Add more explicit waits

### Issue: Test fails with "Element is not clickable"

**Possible causes**:
1. Element is covered by another element
2. Element is outside the viewport
3. Element is disabled

**Solutions**:
1. Scroll the element into view before clicking
2. Check if there are overlays or modals
3. Check if the element is enabled

### Issue: Test fails with "Navigation timeout"

**Possible causes**:
1. Slow network
2. Page is loading too many resources
3. JavaScript errors preventing page load

**Solutions**:
1. Increase navigation timeout
2. Check for JavaScript errors in the console
3. Check network requests for slow responses

### Issue: Test fails with "JavaScript error"

**Possible causes**:
1. Application code has errors
2. Test is interacting with the page too early
3. Browser compatibility issues

**Solutions**:
1. Check the browser console for errors
2. Add explicit waits before interacting with the page
3. Test in different browsers
