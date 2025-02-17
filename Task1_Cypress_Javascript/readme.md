# **Circula Signup Automation - Cypress JavaScript**

This repository contains Cypress-based **End-to-End (E2E) test automation** for the **Circula Signup Flow**. The automated tests cover various aspects of the signup journey, ensuring smooth user registration.

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
- **Cypress** (for browser automation)
- **JavaScript** (for scripting tests)
- **Node.js & npm** (for package management)

---

## **Project Structure**
```
📂 Circula-Cypress-Automation
│── 📂 cypress
│   │── 📂 e2e
│   │   │── 📂 pages              # Page Object Model (POM) classes for different screens
│   │   │── 🐟 e2eTest.cy.js      # End-to-end signup test
│   │   │── 🐟 navigationTest.cy.js  # Navigation validation tests
│   │   │── 🐟 uiValidationTest.cy.js # UI validation & error message tests
│   │── 📂 support
│   │   │── 🐟 signupHelper.js    # Utility/helper functions for signup steps
│   │   │── 🐟 testDataHelper.js  # Test data utility (dynamic data generation)
│   │── 📂 fixtures
│   │   │── 🐟 circulaTestData.json  # Centralized test data storage
│── 🐟 package.json           # Project dependencies & scripts
│── 🐟 cypress.config.js      # Cypress configuration file
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

### **Running Specific Tests**
To execute only **E2E tests**:
```sh
npx cypress run --spec cypress/e2e/e2eTest.cy.js
```
To execute only **UI validation tests**:
```sh
npx cypress run --spec cypress/e2e/uiValidationTest.cy.js
```
To execute only **Navigation tests**:
```sh
npx cypress run --spec cypress/e2e/navigationTest.cy.js
```

---

## **Test Reports**
After test execution, Cypress automatically generates a report in the console output. Additional reporting tools can be integrated if needed.

---

## **Key Features**
✅ **Fully automated E2E signup flow**  
✅ **Page Object Model (POM) structure for scalability**  
✅ **Dynamic test data generation using Faker.js**  
✅ **Robust error handling & validation checks**  
✅ **Parallel test execution supported** 