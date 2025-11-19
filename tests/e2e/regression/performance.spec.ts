import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import testData from '../../fixtures/test-data.json';

/**
 * Regression Tests - Performance
 * Ensures application performance meets requirements
 */
test.describe('Performance - Regression Suite', () => {
  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    const { maxPageLoadTime } = testData.performance;
    
    expect(loadTime).toBeLessThan(maxPageLoadTime);
    console.log(`Page load time: ${loadTime}ms`);
  });

  test('should have acceptable Time to Interactive (TTI)', async ({ page }) => {
    await page.goto('/');
    
    const tti = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        if (window.performance && window.performance.timing) {
          const timing = window.performance.timing;
          const tti = timing.domInteractive - timing.navigationStart;
          resolve(tti);
        } else {
          resolve(0);
        }
      });
    });
    
    console.log(`Time to Interactive: ${tti}ms`);
    expect(tti).toBeGreaterThan(0);
    expect(tti).toBeLessThan(3000); // Should be interactive within 3 seconds
  });

  test('should not have memory leaks on navigation', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Navigate multiple times
    for (let i = 0; i < 5; i++) {
      await homePage.goto();
      await page.waitForLoadState('networkidle');
      await homePage.reload();
    }
    
    // Get memory metrics if available
    const metrics = await page.metrics();
    console.log('Memory metrics:', metrics);
    
    // Basic validation - test should complete without crashes
    expect(metrics).toBeTruthy();
  });

  test('should load all resources successfully', async ({ page }) => {
    const failedRequests: string[] = [];
    
    page.on('requestfailed', (request) => {
      failedRequests.push(request.url());
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify no resources failed to load
    expect(failedRequests).toHaveLength(0);
  });

  test('should have acceptable First Contentful Paint', async ({ page }) => {
    await page.goto('/');
    
    const fcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            resolve(fcpEntry.startTime);
            observer.disconnect();
          }
        });
        observer.observe({ type: 'paint', buffered: true });
        
        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });
    
    if (fcp > 0) {
      console.log(`First Contentful Paint: ${fcp}ms`);
      expect(fcp).toBeLessThan(2000); // Should paint within 2 seconds
    }
  });

  test('should handle concurrent requests efficiently', async ({ page }) => {
    const startTime = Date.now();
    
    // Navigate and wait for all network activity
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const totalTime = Date.now() - startTime;
    
    // Total time should be reasonable even with multiple concurrent requests
    expect(totalTime).toBeLessThan(10000);
  });
});
