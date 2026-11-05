# Rahul Shetty Academy login page test plan

## Application Overview

Explore the Rahul Shetty Academy client login page and create a QA test plan covering login, registration navigation, and password recovery behavior with happy-path and validation scenarios.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. should log in with valid credentials

**File:** `tests/auth/should-log-in-with-valid-credentials.spec.ts`

**Steps:**
  1. Open the login page at https://rahulshettyacademy.com/client/#/auth/login
    - expect: The login form is visible with email, password, and Login button.
  2. Enter a valid registered email address in the Email field
    - expect: The Email field displays the typed email.
  3. Enter the matching valid password in the Password field
    - expect: The Password field displays the typed value as a masked entry.
  4. Click the Login button
    - expect: The user is redirected to the authenticated landing page or dashboard.
    - expect: The login form is no longer shown.

#### 1.2. should reject blank login submission

**File:** `tests/auth/should-reject-blank-login-submission.spec.ts`

**Steps:**
  1. Open the login page
    - expect: The Email and Password fields are empty and the Login button is enabled.
  2. Click the Login button without entering any values
    - expect: The form shows a validation message or keeps the user on the login screen.
    - expect: No redirect occurs.
  3. Observe the error feedback for required fields
    - expect: The user sees clear validation language indicating email and password are required.

#### 1.3. should reject invalid credentials

**File:** `tests/auth/should-reject-invalid-credentials.spec.ts`

**Steps:**
  1. Open the login page
    - expect: The login form is visible.
  2. Enter a valid-looking but unregistered email address
    - expect: The field accepts the value.
  3. Enter an incorrect password
    - expect: The password field accepts the value.
  4. Click the Login button
    - expect: The page shows an authentication error message.
    - expect: The user remains on the login form.

#### 1.4. should navigate to registration page from login page

**File:** `tests/auth/should-navigate-to-registration-page-from-login-page.spec.ts`

**Steps:**
  1. Open the login page
    - expect: The login form is displayed.
  2. Click the Register link or the Register button in the page header
    - expect: The user navigates to the registration page.
    - expect: The page URL changes to the auth/register route.
  3. Verify the registration form loads
    - expect: The Registration heading and required fields are visible.

### 2. Account recovery

**Seed:** `tests/seed.spec.ts`

#### 2.1. should navigate to forgot password flow

**File:** `tests/auth/should-navigate-to-forgot-password-flow.spec.ts`

**Steps:**
  1. Open the login page
    - expect: The login form is visible.
  2. Click the Forgot password? link
    - expect: The browser navigates to the password reset page.
    - expect: The page shows a password reset form.
  3. Verify recovery fields are displayed
    - expect: The Email, Password, Confirm Password, and Save New Password controls are visible.

#### 2.2. should validate password reset form inputs

**File:** `tests/auth/should-validate-password-reset-form-inputs.spec.ts`

**Steps:**
  1. Open the password reset page
    - expect: The Enter New Password form is visible.
  2. Leave required fields blank and click Save New Password
    - expect: Validation messages appear for required fields or the form prevents submission.
    - expect: The user remains on the password reset page.
  3. Enter mismatched passwords
    - expect: The form shows a mismatch error or prevents saving the new password.
