# POM login tests

## Application Overview

Page Object Model implementation for positive login scenarios using only the valid account provided by the user.

## Test Scenarios

### 1. POM login validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Valid user can log in using POM methods

**File:** `tests/rahulShetty.spec.ts`

**Steps:**
  1. Instantiate the LoginPage object and open the login screen
    - expect: The login form is visible.
  2. Fill the valid email and password through page-object methods
    - expect: The input values are accepted.
  3. Click Login by using the page object method
    - expect: The page moves away from the login screen and shows the dashboard/storefront.

#### 1.2. Valid user can log in using keyboard input through POM

**File:** `tests/rahulShetty.spec.ts`

**Steps:**
  1. Open the login page and call the keyboard-based login method
    - expect: The email and password fields are populated.
  2. Submit with Enter
    - expect: The user lands on the main storefront.

#### 1.3. Valid user can log in again after revisiting the app

**File:** `tests/rahulShetty.spec.ts`

**Steps:**
  1. Go back to the login page and use the same valid user again
    - expect: The account is accepted on the second login attempt.
  2. Verify that the app remains on the main page after login
    - expect: The login form is no longer visible and the dashboard is active.
