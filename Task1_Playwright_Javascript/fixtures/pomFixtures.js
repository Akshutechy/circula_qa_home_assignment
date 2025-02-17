/**
 * @file This file sets up Playwright test fixtures to provide 
 * reusable Page Object Model (POM) instances for different test scenarios.
 * 
 * It extends the base Playwright `test` object with additional 
 * page objects for improved test modularity and maintainability.
 */

const { test: baseTest, expect } = require('@playwright/test');
const { LoginPage } = require('../tests/pages/LoginPage');
const { SignupStep1Page } = require('../tests/pages/SignupStep1Page');
const { SignupStep2Page } = require('../tests/pages/SignupStep2Page');
const { SignupStep3Page } = require('../tests/pages/SignupStep3Page');

/**
 * Playwright fixture extension that provides instances of page objects 
 * for different steps in the signup process.
 * 
 * This allows for dependency injection of POM instances into test cases, 
 * improving reusability and structure.
 */
const testPages = baseTest.extend({

    /**
     * Provides an instance of `LoginPage`.
     * 
     * @param {Object} page - The Playwright `Page` instance.
     * @param {Function} use - Callback function to inject the page object into the test.
     */
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    /**
     * Provides an instance of `SignupStep1Page`.
     * 
     * @param {Object} page - The Playwright `Page` instance.
     * @param {Function} use - Callback function to inject the page object into the test.
     */
    signupStep1Page: async ({ page }, use) => {
        await use(new SignupStep1Page(page));
    },

    /**
     * Provides an instance of `SignupStep2Page`.
     * 
     * @param {Object} page - The Playwright `Page` instance.
     * @param {Function} use - Callback function to inject the page object into the test.
     */
    signupStep2Page: async ({ page }, use) => {
        await use(new SignupStep2Page(page));
    },

    /**
     * Provides an instance of `SignupStep3Page`.
     * 
     * @param {Object} page - The Playwright `Page` instance.
     * @param {Function} use - Callback function to inject the page object into the test.
     */
    signupStep3Page: async ({ page }, use) => {
        await use(new SignupStep3Page(page));
    }
});

/**
 * Exports the extended test fixture with injected page objects.
 * 
 * This allows the test cases to directly access predefined page objects 
 * for better test structure.
 */
module.exports = { test: testPages, expect };
