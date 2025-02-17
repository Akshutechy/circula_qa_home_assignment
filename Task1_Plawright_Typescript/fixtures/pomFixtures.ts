import { test as baseTest, expect as playwrightExpect } from '@playwright/test';
import { LoginPage } from '../tests/pages/LoginPage';
import { SignupStep1Page } from '../tests/pages/SignupStep1Page';
import { SignupStep2Page } from '../tests/pages/SignupStep2Page';
import { SignupStep3Page } from '../tests/pages/SignupStep3Page';
/**
 * Defines the type for all Page Object Model (POM) classes used in tests.
 * This ensures that each test has access to specific page objects.
 */
type Pages = {
    loginPage: LoginPage;
    signupStep1Page: SignupStep1Page;
    signupStep2Page: SignupStep2Page;
    signupStep3Page: SignupStep3Page;
};

/**
 * Playwright test fixture that extends the base test and provides 
 * instances of page object models for better code reusability and readability.
 */
const testPages = baseTest.extend<Pages>({
    /**
     * Provides an instance of the LoginPage.
     * @param {Object} page - Playwright Page instance.
     * @param {Function} use - Callback function to execute the test with the injected LoginPage.
     */
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    /**
     * Provides an instance of the SignupStep1Page.
     * @param {Object} page - Playwright Page instance.
     * @param {Function} use - Callback function to execute the test with the injected SignupStep1Page.
     */
    signupStep1Page: async ({ page }, use) => {
        await use(new SignupStep1Page(page));
    },

    /**
     * Provides an instance of the SignupStep2Page.
     * @param {Object} page - Playwright Page instance.
     * @param {Function} use - Callback function to execute the test with the injected SignupStep2Page.
     */
    signupStep2Page: async ({ page }, use) => {
        await use(new SignupStep2Page(page));
    },

    /**
     * Provides an instance of the SignupStep3Page.
     * @param {Object} page - Playwright Page instance.
     * @param {Function} use - Callback function to execute the test with the injected SignupStep3Page.
     */
    signupStep3Page: async ({ page }, use) => {
        await use(new SignupStep3Page(page));
    }
});

/**
 * Exporting the extended test instance for use in test files.
 */
export const test = testPages;

/**
 * Exporting Playwright's expect assertion library for test validations.
 */
export const expect = testPages.expect;
