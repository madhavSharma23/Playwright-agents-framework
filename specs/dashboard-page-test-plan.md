# Dashboard Page Test Plan

## Application Overview

Explore the authenticated dashboard page of Rahul Shetty Academy and create a detailed QA plan covering shell navigation, search/filtering, product listing, cart actions, pagination, and sign-out flows.

## Test Scenarios

### 1. Dashboard shell and navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. authenticated dashboard loads correctly

**File:** `tests/dashboard/authenticated-dashboard-load.spec.ts`

**Steps:**
  1. Open the app in a fresh authenticated session
    - expect: The dashboard page loads successfully
    - expect: The URL includes #/dashboard/dash
    - expect: The application header is visible
  2. Inspect the top navigation region
    - expect: The brand header is visible
    - expect: The QA Career Accelerator link is present
    - expect: HOME, ORDERS, Cart, and Sign Out buttons are visible
  3. Review the page structure
    - expect: The left-side filter panel is visible
    - expect: The product list area is visible
    - expect: The footer text is visible

#### 1.2. header navigation routes behave correctly

**File:** `tests/dashboard/header-navigation.spec.ts`

**Steps:**
  1. Click HOME from the top navigation
    - expect: The user remains on the dashboard home view
  2. Click ORDERS
    - expect: The orders route or view is opened without layout breakage
  3. Click Cart
    - expect: The cart route or cart panel opens and shows selected products if any
  4. Click Sign Out
    - expect: The session is cleared and the user returns to the login page

### 2. Search and filtering

**Seed:** `tests/seed.spec.ts`

#### 2.1. search text filters products by keyword

**File:** `tests/dashboard/search-filter.spec.ts`

**Steps:**
  1. Enter a product keyword that matches one or more cards
    - expect: Only matching products remain visible
  2. Enter a keyword that does not match any product
    - expect: The product list becomes empty or shows a no-results state
    - expect: The page layout remains intact
  3. Clear the search field
    - expect: The unfiltered dashboard listing returns

#### 2.2. price filter restricts products to a selected range

**File:** `tests/dashboard/price-range-filter.spec.ts`

**Steps:**
  1. Type a minimum price and maximum price within a valid range
    - expect: Only products inside that range remain visible
  2. Use a range where min is greater than max
    - expect: The app prevents invalid filtering or renders a clear empty result state
  3. Clear the price inputs
    - expect: The original result listing returns

#### 2.3. category and sub-category filters work correctly

**File:** `tests/dashboard/category-filter.spec.ts`

**Steps:**
  1. Select one category checkbox
    - expect: The products list updates to that category only
  2. Select multiple categories
    - expect: The results include products from all selected categories
  3. Select a sub-category
    - expect: Only relevant products remain visible
  4. Remove all selections
    - expect: The full list is restored

#### 2.4. gender or search-for filters narrow results

**File:** `tests/dashboard/gender-search-filter.spec.ts`

**Steps:**
  1. Choose a gender or search-for option
    - expect: Only matching products remain visible
  2. Change the selection to another option
    - expect: The list updates to reflect the new filter
  3. Clear the filter
    - expect: The full product list returns

### 3. Product listing and product actions

**Seed:** `tests/seed.spec.ts`

#### 3.1. product cards render the required fields

**File:** `tests/dashboard/product-card.spec.ts`

**Steps:**
  1. Inspect each visible product card
    - expect: The product name is visible
    - expect: The price is visible
    - expect: The View button is visible
    - expect: The Add To Cart button is visible
  2. Check the summary label above the list
    - expect: The visible result count matches the number of cards shown
    - expect: The text states the current maximum product display rule

#### 3.2. View button opens the correct detail state

**File:** `tests/dashboard/view-product.spec.ts`

**Steps:**
  1. Click the View button on a specific product
    - expect: The product detail view is opened or the relevant preview state loads
  2. Compare the displayed name and price
    - expect: They match the product selected from the dashboard
  3. Navigate back to the listing
    - expect: The dashboard list is restored without broken navigation

#### 3.3. Add To Cart updates cart state

**File:** `tests/dashboard/add-to-cart.spec.ts`

**Steps:**
  1. Click Add To Cart for one product
    - expect: The cart count or success feedback updates
  2. Open the cart
    - expect: The selected item appears in the cart list
  3. Add a second product
    - expect: The cart reflects multiple items correctly

### 4. Pagination and result state

**Seed:** `tests/seed.spec.ts`

#### 4.1. pagination controls display and work as expected

**File:** `tests/dashboard/pagination.spec.ts`

**Steps:**
  1. Inspect the pagination area on the first page
    - expect: Previous and Next controls are visible
    - expect: The active page indicator shows page 1
  2. Click Next
    - expect: The next page of products loads
    - expect: The page indicator updates
  3. Click Previous once more
    - expect: The previous set of products loads

#### 4.2. result count remains accurate after filtering

**File:** `tests/dashboard/result-count.spec.ts`

**Steps:**
  1. Apply a filter that returns fewer results
    - expect: The count updates to the smaller number
  2. Apply a filter that returns zero results
    - expect: The UI handles the empty state gracefully
  3. Clear the filter
    - expect: The count and product list return to the original state

### 5. Cart, orders, and session lifecycle

**Seed:** `tests/seed.spec.ts`

#### 5.1. cart summary reflects selected products

**File:** `tests/dashboard/cart-summary.spec.ts`

**Steps:**
  1. Add products to the cart
    - expect: The cart count or summary updates
    - expect: The selected items are persisted for the active session
  2. Open cart
    - expect: Each added product is visible with the expected details
  3. Review the cart totals if shown
    - expect: The totals correctly reflect the selected products

#### 5.2. orders route is reachable and usable

**File:** `tests/dashboard/orders-route.spec.ts`

**Steps:**
  1. Click ORDERS from the header
    - expect: The orders route loads
  2. Review the page state
    - expect: The page renders without crashes
    - expect: Any empty state is clear and user-friendly

#### 5.3. sign out ends the user session

**File:** `tests/dashboard/sign-out.spec.ts`

**Steps:**
  1. Click Sign Out
    - expect: The authenticated session is cleared
    - expect: The user is redirected to the login page
  2. Attempt to return to a dashboard route without login
    - expect: The app redirects back to auth/login or blocks access
