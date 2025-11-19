# Running Playwright Tests and Generating HTML Reports

This document provides instructions on how to run the Playwright tests and generate HTML reports for the React AWS EC2 Nginx project.

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Local Execution

### Step 1: Install Dependencies

Navigate to the tests directory and install the dependencies:

```bash
cd tests
npm install
```

### Step 2: Install Playwright Browsers

Install the required browsers:

```bash
npx playwright install chromium firefox
```

### Step 3: Run Tests

Run the tests with the PLAYWRIGHT_MCP environment variable:

```bash
PLAYWRIGHT_MCP=1 npx playwright test
```

To run tests for a specific browser:

```bash
# For Chromium only
PLAYWRIGHT_MCP=1 npx playwright test --project=chromium

# For Firefox only
PLAYWRIGHT_MCP=1 npx playwright test --project=firefox
```

### Step 4: View HTML Report

After the tests complete, an HTML report will be generated in the `playwright-report` directory. To view the report:

```bash
npx playwright show-report
```

This will open the HTML report in your default browser.

## GitHub Actions Execution

We've set up a GitHub Actions workflow to run the tests and generate HTML reports automatically.

### Running Tests via GitHub Actions

1. Go to the GitHub repository
2. Click on the "Actions" tab
3. Select the "Run Playwright Tests" workflow
4. Click "Run workflow"
5. Select the browser you want to run tests on (chromium, firefox, or both)
6. Click "Run workflow" again

### Accessing HTML Reports from GitHub Actions

1. After the workflow completes, go to the workflow run
2. Scroll down to the "Artifacts" section
3. Download the "playwright-report" artifact
4. Extract the downloaded zip file
5. Open the `index.html` file in your browser

## Troubleshooting

If you encounter any issues:

1. Check that all dependencies are installed
2. Verify that the browsers are installed correctly
3. Check the test logs for any error messages
4. Refer to the [DEBUGGING.md](./DEBUGGING.md) file for more troubleshooting tips
