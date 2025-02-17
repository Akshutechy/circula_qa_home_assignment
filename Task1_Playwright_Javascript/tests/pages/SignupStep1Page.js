import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

/**
 * Represents the first step of the signup process.
 * Extends `BasePage` to inherit common web interactions.
 */
export class SignupStep1Page extends BasePage {
    /**
     * Locators for various elements on the signup step 1 page.
     * @type {Locator}
     */
    emailField;
    passwordField;
    termsCheckbox;
    tryForFreeButton;
    emailErrorMessage;
    passwordErrorMessage;
    termsErrorMessage;

    /**
     * Initializes the SignupStep1Page with locators.
     * @param {Page} page - Playwright Page instance.
     */
    constructor(page) {
        super(page);
        this.emailField = page.locator("input[name='email']");
        this.passwordField = page.locator("input[name='password']");
        this.termsCheckbox = page.locator('(//input[@type="checkbox"][@name="acceptTos"]/following-sibling::div)[1]');
        this.tryForFreeButton = page.locator("button:has-text('Try for free')");
        this.emailErrorMessage = page.locator("text=Work email is required.");
        this.passwordErrorMessage = page.locator("text=Min. 8 characters");
        this.termsErrorMessage = page.locator("text=Please accept the Terms and Conditions to continue.");
    }

    /**
     * Verifies if the signup step 1 page is loaded.
     * @returns {Promise<boolean>} Resolves to `true` if the email field is visible.
     */
    async isStep1PageLoaded() {
        return await this.isElementVisible(this.emailField);
    }

    /**
     * Inputs the provided email into the email field.
     * @param {string} emailText - The email to be entered.
     * @returns {Promise<void>} Resolves after entering the email.
     */
    async enterEmail(emailText) {
        await this.fillFormField(this.emailField, emailText);
    }

    /**
     * Inputs the provided password into the password field.
     * @param {string} passwordText - The password to be entered.
     * @returns {Promise<void>} Resolves after entering the password.
     */
    async enterPassword(passwordText) {
        await this.fillFormField(this.passwordField, passwordText);
    }

    /**
     * Selects the "Terms and Conditions" checkbox.
     * @returns {Promise<void>} Resolves after the checkbox is selected.
     */
    async selectTermsCheckbox() {
        await this.selectCheckBox(this.termsCheckbox, true);
    }

    /**
     * Clicks on the "Try for Free" button after accepting cookies.
     * @returns {Promise<void>} Resolves after clicking the button.
     */
    async clickTryForFree() {
        await this.acceptCookiesIfPresent();
        await this.clickElement(this.tryForFreeButton);
    }

    /**
     * Completes step 1 of the signup form by entering email, password, 
     * selecting the terms checkbox, and clicking "Try for Free".
     * @param {string} emailText - The email to be entered.
     * @param {string} passwordText - The password to be entered.
     * @returns {Promise<void>} Resolves after completing step 1.
     */
    async fillSignupForm(emailText, passwordText) {
        await this.acceptCookiesIfPresent();
        await this.enterEmail(emailText);
        await this.enterPassword(passwordText);
        await this.selectTermsCheckbox();
        await this.clickTryForFree();
    }

    /**
     * Checks if the email error message is displayed.
     * @returns {Promise<boolean>} Resolves to `true` if the email error is visible.
     */
    async isEmailErrorVisible() {
        return await this.isElementVisible(this.emailErrorMessage);
    }

    /**
     * Checks if the password error message is displayed.
     * @returns {Promise<boolean>} Resolves to `true` if the password error is visible.
     */
    async isPasswordErrorVisible() {
        return await this.isElementVisible(this.passwordErrorMessage);
    }

    /**
     * Checks if the terms and conditions error message is displayed.
     * @returns {Promise<boolean>} Resolves to `true` if the terms error is visible.
     */
    async isTermsErrorVisible() {
        return await this.isElementVisible(this.termsErrorMessage);
    }
}
