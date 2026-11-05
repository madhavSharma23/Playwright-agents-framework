# Rahul Shetty Academy Auth Test Plan

## Application Overview

Explore the Rahul Shetty Academy authentication experience and create a comprehensive test plan covering login, registration, and password reset user journeys on the public client app.

## Test Scenarios

### 1. Authentication flows

**Seed:** `tests/seed.spec.ts`

#### 1.1. successful login with valid credentials

**File:** `tests/auth/successful-login.spec.ts`

**Steps:**
  1. Open the login page in a fresh browser session
    - expect: The email field, password field, and Login button are visible
  2. Enter a valid registered email and password
    - expect: The credentials are accepted in the form
  3. Click Login
    - expect: The user is redirected to the dashboard/home page
    - expect: The URL contains #/dashboard/dash

#### 1.2. blank login form is rejected

**File:** `tests/auth/blank-login.spec.ts`

**Steps:**
  1. Open the login page
    - expect: The login form is displayed
  2. Leave both email and password empty and click Login
    - expect: The form is not submitted
    - expect: The user remains on the login page
    - expect: Native browser validation blocks the submission or the page displays validation feedback

#### 1.3. invalid email format is blocked

**File:** `tests/auth/invalid-email.spec.ts`

**Steps:**
  1. Open the login page
    - expect: The email field is empty and editable
  2. Type an invalid email such as invalid-email
    - expect: The browser marks the field as invalid
  3. Enter a valid password and attempt to submit
    - expect: The user stays on the login page
    - expect: The form is not submitted

#### 1.4. wrong credentials are rejected

**File:** `tests/auth/wrong-credentials.spec.ts`

**Steps:**
  1. Open the login page
    - expect: The login page is available
  2. Enter a valid email format with a wrong password or unknown account
    - expect: The form accepts the values
  3. Click Login
    - expect: The user remains on the auth/login route
    - expect: The login form remains visible
    - expect: No dashboard redirect occurs

#### 1.5. forgot password navigation works

**File:** `tests/auth/forgot-password-navigation.spec.ts`

**Steps:**
  1. Open the login page
    - expect: The Forgot password link is visible
  2. Click Forgot password?
    - expect: The user is taken to the password reset screen
    - expect: The page shows the password reset form

### 2. Registration flow

**Seed:** `tests/seed.spec.ts`

#### 2.1. register link opens the registration journey

**File:** `tests/auth/register-navigation.spec.ts`

**Steps:**
  1. Open the login page
    - expect: The Register link is visible
  2. Click Register
    - expect: The registration page is opened
    - expect: The first name, last name, email, phone, password, and confirm password fields are visible

#### 2.2. registration form validation for required fields

**File:** `tests/auth/register-validation.spec.ts`

**Steps:**
  1. Open the registration page
    - expect: The registration form is visible
  2. Leave required fields blank and attempt to register
    - expect: The form prevents submission
    - expect: Validation messages or browser validation appear
  3. Fill only some fields and retry
    - expect: The missing required errors are shown

#### 2.3. successful registration flow

**File:** `tests/auth/successful-registration.spec.ts`

**Steps:**
  1. Open the registration page
    - expect: The registration form is available
  2. Complete all mandatory fields with valid values
    - expect: The form accepts the values
  3. Submit the registration form
    - expect: The user is directed to the next expected onboarding or sign-in state

### 3. Password recovery

**Seed:** `tests/seed.spec.ts`

#### 3.1. password reset form loads correctly

**File:** `tests/auth/reset-form-load.spec.ts`

**Steps:**
  1. Open the forgot password page
    - expect: The email field, password fields, and submit button are visible
  2. Verify the title or heading text
    - expect: The screen clearly indicates a password reset flow

#### 3.2. password reset validation for mismatched passwords

**File:** `tests/auth/reset-password-validation.spec.ts`

**Steps:**
  1. Open the reset password page
    - expect: The form is visible
  2. Enter an email, a new password, and a different confirm password
    - expect: The form accepts the values
  3. Submit the form
    - expect: The app shows a validation error or blocks the action because the passwords do not match

#### 3.3. password reset success path

**File:** `tests/auth/reset-password-success.spec.ts`

**Steps:**
  1. Open the reset password page
    - expect: The form is present
  2. Enter a valid email and matching new passwords
    - expect: The form accepts the input
  3. Submit the form
    - expect: The app confirms the password change flow succeeds or displays the next expected confirmation state
