# Test Debugging Guide

This guide provides strategies for debugging tests in the React AWS EC2 Nginx application test automation framework.

## Common Issues and Solutions

### Tests Failing Intermittently

**Symptoms:**
- Tests pass locally but fail in CI
- Tests pass sometimes and fail other times with the same code

**Possible Causes:**
1. Race conditions
2. Timing issues
3. Network latency
4. Resource constraints in CI environment

**Solutions:**
1. Use explicit waits instead of fixed timeouts:
   ```typescript
   // Instead of this:
   await page.waitForTimeout(1000);
   
   // Use this:
   await page.waitForSelector('.element', { state: 'visible' });
   ```

2. Increase timeouts for specific actions:
   ```typescript
   await page.click('.button', { timeout: 10000 });
   ```

3. Enable retry for flaky tests:
   ```typescript
   test.describe.configure({ retries: 2 });
   ```

4. Check for network idle state:
   ```typescript
   await page.waitForLoadState('networkidle');
   ```

### Element Not Found

**Symptoms:**
- Error: "TimeoutError: waiting for selector '.element' to be visible"

**Possible Causes:**
1. Selector is incorrect
2. Element is in an iframe
3. Element appears after JavaScript execution
4. Element is outside the viewport

**Solutions:**
1. Verify selector in Playwright Inspector:
   ```bash
   npx playwright test --debug
   ```

2. Use more robust selectors:
   ```typescript
   // Instead of:
   page.locator('.submit-button');
   
   // Use:
   page.getByRole('button', { name: 'Submit' });
   ```

3. For iframes, use frame locators:
   ```typescript
   const frame = page.frameLocator('#my-iframe');
   await frame.locator('.element').click();
   ```

4. Scroll element into view:
   ```typescript
   await element.scrollIntoViewIfNeeded();
   ```

### Authentication Issues

**Symptoms:**
- Tests fail with "unauthorized" errors
- Redirects to login page unexpectedly

**Solutions:**
1. Use storage state to save and reuse authentication:
   ```typescript
   // Save auth state
   await page.context().storageState({ path: 'auth.json' });
   
   // Use auth state
   test.use({ storageState: 'auth.json' });
   ```

2. Implement a helper for authentication:
   ```typescript
   async function login(page) {
     await page.goto('/login');
     await page.fill('#username', 'user');
     await page.fill('#password', 'pass');
     await page.click('#login-button');
     await page.waitForURL('/dashboard');
   }
   ```

### Visual Differences

**Symptoms:**
- Elements appear differently than expected
- Layout issues

**Solutions:**
1. Use screenshot comparison:
   ```typescript
   await expect(page).toHaveScreenshot('expected.png');
   ```

2. Check viewport size:
   ```typescript
   await page.setViewportSize({ width: 1280, height: 720 });
   ```

## Debugging Techniques

### Using Playwright Debug Mode

Run tests in debug mode to use the Playwright Inspector:
```bash
npm run test:e2e:debug
```

This opens the Playwright Inspector, which allows you to:
- Step through test execution
- Inspect the DOM
- View console logs
- Try selectors interactively

### Using Playwright UI Mode

Run tests with the Playwright UI:
```bash
npm run test:e2e:ui
```

This provides a graphical interface for:
- Running specific tests
- Viewing test results
- Exploring traces
- Debugging failed tests

### Using Traces

1. Configure trace capture in `playwright.config.ts`:
   ```typescript
   use: {
     trace: 'on-first-retry', // or 'on', 'off', 'retain-on-failure'
   }
   ```

2. View traces after test execution:
   ```bash
   npm run test:e2e:trace
   ```

3. Analyze the trace to see:
   - Network requests
   - Console logs
   - Action timeline
   - Screenshots at each step

### Adding Debug Logs

Add console logs to your tests for debugging:
```typescript
test('should work', async ({ page }) => {
  console.log('Starting test');
  await page.goto('/');
  console.log('Page loaded');
  
  const title = await page.title();
  console.log('Page title:', title);
});
```

Run with debug logs visible:
```bash
DEBUG=pw:api npm run test:e2e
```

### Taking Screenshots During Test Execution

Add screenshots at specific points in your test:
```typescript
test('complex interaction', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'screenshots/step1.png' });
  
  await page.click('.button');
  await page.screenshot({ path: 'screenshots/step2.png' });
  
  // More actions...
});
```

## Advanced Debugging

### Network Request Debugging

1. Log all network requests:
   ```typescript
   test('network monitoring', async ({ page }) => {
     page.on('request', request => console.log('Request:', request.url()));
     page.on('response', response => console.log('Response:', response.url(), response.status()));
     
     await page.goto('/');
   });
   ```

2. Mock network responses:
   ```typescript
   await page.route('**/api/data', route => {
     route.fulfill({
       status: 200,
       body: JSON.stringify({ success: true, data: [] })
     });
   });
   ```

### Performance Debugging

1. Measure page load performance:
   ```typescript
   const startTime = Date.now();
   await page.goto('/');
   const loadTime = Date.now() - startTime;
   console.log(`Page loaded in ${loadTime}ms`);
   ```

2. Use Playwright's built-in performance helpers:
   ```typescript
   const timing = await page.evaluate(() => JSON.stringify(window.performance.timing));
   console.log('Performance timing:', timing);
   ```

## Getting Help

If you're still having issues after trying these debugging techniques:

1. Check the [Playwright documentation](https://playwright.dev/docs/intro)
2. Search for similar issues in the project's issue tracker
3. Reach out to the team for assistance
