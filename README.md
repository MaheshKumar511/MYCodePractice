# MYCodePractice — Playwright Automation Framework

## Overview

`MYCodePractice` is a **Playwright + TypeScript automation framework** covering both UI and API automation.

The project focuses on building a structured, reusable, maintainable automation solution with:

* UI automation
* API automation
* Page Object Model
* Custom Playwright fixtures
* Reusable Playwright wrapper
* Application-level page management
* Excel-based test data
* Environment-based credentials
* Screenshot capture
* PDF reporting
* Allure reporting
* GitHub Actions CI/CD
* TypeScript API response models

The framework is designed to demonstrate how UI and API automation can be organized together with reusable components, test-data management, reporting, and continuous integration.

---

## Application Under Test

The UI automation is implemented against the Rahul Shetty Academy e-commerce application.

**Application:**

https://rahulshettyacademy.com/client/

The API automation uses the application's available REST endpoints.

---

# UI Automation

The primary UI automation covers an end-to-end e-commerce flow:

```text
Login
  ↓
Dashboard
  ↓
Product Selection
  ↓
Add To Cart
  ↓
Cart Validation
  ↓
Checkout
  ↓
Payment Details
  ↓
Country Selection
  ↓
Place Order
  ↓
Order Confirmation
```

The UI automation is divided into separate page classes:

```text
LoginPage
DashboardPage
CartPage
CheckoutPage
ConfirmationPage
```

Each page contains its own locators and page-specific actions, while the test specification controls the overall business flow.

---

# Framework Architecture

```text
MYCodePractice
│
├── API
│   ├── Client
│   │   ├── ApiClient.ts
│   │   ├── AuthApi.ts
│   │   ├── ProductApi.ts
│   │   └── OrderApi.ts
│   │
│   ├── Model
│   │   ├── AuthResponse.ts
│   │   ├── OrderResponse.ts
│   │   └── ProductResponse.ts
│   │
│   ├── ApiFixture.ts
│   └── ApiTestFixture.ts
│
├── costomFixture
│   ├── common
│   │   └── PlaywrightWrapper.ts
│   └── MaheshCostomfixture.ts
│
├── pages
│   └── RahulShetty
│       ├── RahulShettyApp.ts
│       ├── loginPage.ts
│       ├── dashBoardPage.ts
│       ├── cartPage.ts
│       ├── checkOutPage.ts
│       └── conformationPage.ts
│
├── tests
│   ├── RahulShetty
│   └── API
│
├── testData
│   └── TestData.xlsx
│
├── utils
│   ├── excelUtils.ts
│   ├── PdfReport.ts
│   └── PdfReporter.ts
│
├── .github
│   └── workflows
│       └── playwright.yml
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

# Page Object Model

The framework follows the **Page Object Model (POM)** to separate UI implementation from test scenarios.

The test accesses the application through the custom fixture:

```ts
maheshCosomfixture.RahulShetty.loginPage
maheshCosomfixture.RahulShetty.dashboardPage
maheshCosomfixture.RahulShetty.cartPage
maheshCosomfixture.RahulShetty.checkoutPage
maheshCosomfixture.RahulShetty.confirmationPage
```

The application structure is:

```text
Custom Fixture
      ↓
RahulShetty Application
      ↓
Page Object
      ↓
Page Action
```

This keeps the test scenarios focused on business flow while page-specific implementation remains within the corresponding page class.

---

# Custom Playwright Fixture

A custom Playwright fixture is used to initialize and expose the application framework to the tests.

Example:

```ts
test('Place Order Successfully', async ({ maheshCosomfixture }) => {

    await maheshCosomfixture.RahulShetty.loginPage.navigate();

});
```

The fixture also provides centralized screenshot handling for test steps.

---

# Playwright Wrapper

Common Playwright operations are centralized in:

```text
costomFixture/common/PlaywrightWrapper.ts
```

The wrapper provides reusable functionality for operations such as:

* Navigation
* Click
* Fill
* Select option
* Press
* Hover
* Element visibility validation
* Waiting for elements
* Toast validation
* Execution logging

This keeps common browser interaction logic in one reusable layer rather than duplicating it throughout the page classes.

---

# Test Data Management

The UI automation uses Excel-based test data:

```text
testData/TestData.xlsx
```

The Excel utility converts spreadsheet data into typed TypeScript objects.

This allows the same test scenario to execute with different input data without duplicating the test implementation.

Application credentials are kept separately through environment variables.

---

# Credential Management

Credentials are supplied through environment variables:

```text
USER_EMAIL
USER_PASSWORD
```

For local execution, credentials can be provided through `.env`.

For CI execution, credentials are stored using **GitHub Actions Secrets**.

Sensitive credentials are not committed to the repository.

---

# API Automation

The project contains a dedicated API automation layer.

The architecture is:

```text
API Test
    ↓
ApiFixture
    ↓
API Class
    ↓
ApiClient
    ↓
Endpoint
    ↓
Response Model
```

API classes include:

```text
AuthApi
ProductApi
OrderApi
```

This separates API communication, endpoint implementation, authentication, response models, and test assertions.

---

# API Coverage

## Authentication API

* Login
* Token validation
* User ID validation
* Response validation

## Product API

* Get all products
* Validate product response
* Validate product information

## Product Details API

* Get product details
* Validate product ID
* Validate product name
* Validate product price
* Validate product category
* Validate product sub-category
* Validate product description

## Order API

* Create order
* Validate order response
* Get orders for customer
* Validate order count
* Validate order information

---

# Reporting

The framework contains multiple reporting mechanisms.

## Playwright Reporting

Playwright reporting is configured for test execution visibility.

## Allure Reporting

Allure is integrated for detailed test reporting and execution analysis.

## Custom PDF Reporting

A custom PDF reporting implementation generates execution reports containing:

* Test name
* Page
* Test step
* PASS/FAIL status
* Execution screenshot

---

# Screenshot Evidence

Screenshots are captured during framework execution and stored under:

```text
test-results/
```

Screenshots are captured for successful and failed steps, providing visual evidence during test analysis and failure investigation.

---

# CI/CD

GitHub Actions is configured to execute the automation suite automatically.

The workflow performs:

```text
Checkout Repository
       ↓
Node.js Setup
       ↓
Install Dependencies
       ↓
Install Chromium
       ↓
Execute Playwright Tests
       ↓
Publish Test Results
```

The CI environment uses `xvfb-run` to support browser execution on the Linux GitHub Actions runner.

### CI Result

The complete test suite has been successfully executed through GitHub Actions.

**UI and API test cases are passing in CI.**

---

# Running Locally

## Clone Repository

```bash
git clone https://github.com/MaheshKumar511/MYCodePractice.git
```

## Navigate to Project

```bash
cd MYCodePractice
```

## Install Dependencies

```bash
npm install
```

## Install Chromium

```bash
npx playwright install chromium
```

## Configure Credentials

Create a `.env` file:

```text
USER_EMAIL=your_email
USER_PASSWORD=your_password
```

Use valid credentials for the application.

## Execute Tests

```bash
npx playwright test
```

---

# Useful Commands

### Run all tests

```bash
npx playwright test
```

### Run Chromium tests

```bash
npx playwright test --project=chromium
```

### Run a specific test

```bash
npx playwright test tests/RahulShetty/PlaceOrder.spec.ts
```

### Run Playwright UI Mode

```bash
npx playwright test --ui
```

### Open Playwright Report

```bash
npx playwright show-report
```

---

# Validation & Actual Results

The source code and CI execution results are publicly available for review.

### GitHub Repository

https://github.com/MaheshKumar511/MYCodePractice

### GitHub Actions — Actual CI Executions

https://github.com/MaheshKumar511/MYCodePractice/actions

### Application Under Test

https://rahulshettyacademy.com/client/

The GitHub repository contains the framework source code, test cases, configuration, API automation, reporting implementation, and CI/CD workflow.

The **GitHub Actions** section provides access to the actual CI execution history and results.

Anyone reviewing the project can inspect the implementation and validate the execution results through the repository and CI workflow.

---

# Project Approach

The framework follows a separation-of-responsibilities approach:

```text
Test
 ↓
Business Flow
 ↓
Page / API Layer
 ↓
Reusable Framework Components
 ↓
Playwright
```

The test cases describe the business flow, while reusable framework components handle implementation details.

The same principle is applied across both UI and API automation.

---

# Current Automation Scope

The project currently demonstrates:

```text
UI Automation
      +
API Automation
      +
Page Object Model
      +
Custom Fixtures
      +
Reusable Wrapper
      +
Test Data Management
      +
Screenshot Evidence
      +
PDF Reporting
      +
Allure Reporting
      +
CI/CD
```

---

# Future Improvements

The framework can be extended with additional capabilities such as:

* More UI scenarios
* Additional negative API scenarios
* API schema validation
* Dynamic API test-data chaining
* Cross-browser execution
* Environment-specific configuration
* Additional test-data providers
* Enhanced CI reporting
* Additional Allure metadata

These can be added as the automation coverage and requirements grow.

---

# Feedback & Suggestions

This project is continuously being improved.

If you review the implementation and have suggestions or feedback regarding:

* Framework architecture
* Playwright practices
* TypeScript implementation
* API automation
* Test design
* Reporting
* CI/CD
* Maintainability
* Scalability

constructive technical feedback is welcome.

**For any feedback, suggestions, or improvement recommendations, please email:**

**[maheshkumarmore77@gmail.com](mailto:maheshkumarmore77@gmail.com)**

Thank you for taking the time to review the project.
