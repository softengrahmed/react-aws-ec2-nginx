#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Install Playwright browsers
echo "Installing Playwright browsers..."
npx playwright install chromium firefox

# Run tests
echo "Running tests..."
PLAYWRIGHT_MCP=1 npx playwright test

# Generate report
echo "Tests completed. HTML report is available in playwright-report directory."
echo "You can view the report by running: npx playwright show-report"
