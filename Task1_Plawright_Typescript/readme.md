# **Circula Signup Automation - Playwright Typescript**

This repository contains Playwright-based **End-to-End (E2E) test automation** for the **Circula Signup Flow**. The automated tests cover various aspects of the signup journey, ensuring smooth user registration.

## **Automated Scenarios**
The following scenarios have been automated for the **Circula Signup Flow**:

1. **End-to-End Signup Flow**  
   - Validates successful user registration from **Login** to **Account Creation**.

2. **Navigation Tests**  
   - Ensures correct navigation between signup steps:
     - **Login Page → Step 1**
     - **Step 1 ⇄ Step 2**
     - **Step 2 ⇄ Step 3**

3. **UI Validation Tests**  
   - Validates error messages for **mandatory fields** across all signup steps.

---

## **Tech Stack**
- **Playwright** (for browser automation)
- **TypeScript** (for strongly typed, scalable tests)
- **Faker.js** (for dynamic test data generation)
- **Node.js & npm** (for package management)
- **Allure Report** (for test execution reporting)

---

## **Project Structure**
```
📂 Circula-Automation
│── 📂 tests
│   │── 📂 pages              # Page Object Model (POM) classes for different screens
│   │── 📂 helper             # Utility/helper functions for common test actions
│   │── 📂 fixtures           # Playwright test fixtures setup
│   │── 🐟 e2eTest.spec.ts     # End-to-end signup test
│   │── 🐟 navigationTest.spec.ts  # Navigation validation tests
│   │── 🐟 uiValidationTest.spec.ts # UI validation & error message tests
│── 📂 testData
│   │── 🐟 circulaTestData.json  # Centralized test data storage
│── 📂 tests/helper
│   │── 🐟 testDataHelper.ts   # Test data utility (dynamic data generation)
│── 🐟 README.md              # Project documentation
│── 🐟 package.json           # Project dependencies & scripts
│── 🐟 playwright.config.ts   # Playwright configuration file
```

---

## **Installing Dependencies**
Follow these steps to set up the project:

1. Clone the repository:
   ```sh
   git clone https://github.com/Akshutechy/circula_qa_home_assignment.git
   cd circula-signup-automation
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

---

## **Running Tests Locally**
Run tests in **headless mode** using Playwright:

```sh
npm run test
```

To run tests **with UI mode**, use:

```sh
npx playwright test --ui
```

### **Running Specific Tests**
To execute only **E2E tests**:
```sh
npx playwright test e2eTest.spec.ts
```
To execute only **UI validation tests**:
```sh
npx playwright test uiValidationTest.spec.ts
```
To execute only **Navigation tests**:
```sh
npx playwright test navigationTest.spec.ts
```

---

## **Test Reports**
After test execution, a detailed **Allure Report** is generated automatically and opened in your default browser.

---

## **Key Features**
✅ **Fully automated E2E signup flow**  
✅ **Page Object Model (POM) structure for scalability**  
✅ **Dynamic test data generation using Faker.js**  
✅ **Robust error handling & validation checks**  
✅ **Parallel test execution supported**  
✅ **Allure report Integration**  