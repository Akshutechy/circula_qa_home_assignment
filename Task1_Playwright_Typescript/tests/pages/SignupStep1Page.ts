import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

/**
 * SignupStep1Page class represents the first step of the signup process.
 * It extends BasePage and provides methods to interact with the step 1 elements.
 */
export class SignupStep1Page extends BasePage {
    private emailField: Locator;
    private passwordField: Locator;
    private termsCheckbox: Locator;
    private tryForFreeButton: Locator;
    private emailErrorMessage: Locator;
    private passwordErrorMessage: Locator;
    private termsErrorMessage: Locator;

    /**
     * Constructor to initialize the SignupStep1Page.
     * @param {Page} page - Playwright Page instance.
     */
    constructor(page: Page) {
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
     * Checks if the signup step 1 page is loaded.
     * @returns {Promise<Boolean>} - Returns true if the email field is visible.
     */
    async isStep1PageLoaded(): Promise<Boolean> {
        return await this.isElementVisible(this.emailField);
    }

    /**
     * Enters the provided email into the email field.
     * @param {string} emailText - Email to be entered.
     */
    async enterEmail(emailText: string): Promise<void> {
        await this.fillFormField(this.emailField, emailText);
    }

    /**
     * Enters the provided password into the password field.
     * @param {string} passwordText - Password to be entered.
     */
    async enterPassword(passwordText: string): Promise<void> {
        await this.fillFormField(this.passwordField, passwordText);
    }

    /**
     * Selects the "Terms and Conditions" checkbox.
     */
    async selectTermsCheckbox(): Promise<void> {
        await this.selectCheckBox(this.termsCheckbox, true);
    }

    /**
     * Clicks on the "Try for Free" button.
     * - Ensures cookies are accepted before clicking.
     */
    async clickTryForFree(): Promise<void> {
        await this.acceptCookiesIfPresent();
        await this.clickElement(this.tryForFreeButton);
    }

    /**
     * Fills the signup form by entering email, password, selecting the terms checkbox, and clicking "Try for Free".
     * @param {string} emailText - Email to be entered.
     * @param {string} passwordText - Password to be entered.
     */
    async fillSignupForm(emailText: string, passwordText: string): Promise<void> {
        await this.acceptCookiesIfPresent();
        await this.enterEmail(emailText);
        await this.enterPassword(passwordText);
        await this.selectTermsCheckbox();
        await this.clickTryForFree();
    }

    /**
     * Checks if the email error message is visible.
     * @returns {Promise<Boolean>} - Returns true if the error is visible.
     */
    async isEmailErrorVisible(): Promise<Boolean> {
        return await this.isElementVisible(this.emailErrorMessage);
    }

    /**
     * Checks if the password error message is visible.
     * @returns {Promise<Boolean>} - Returns true if the error is visible.
     */
    async isPasswordErrorVisible(): Promise<Boolean> {
        return await this.isElementVisible(this.passwordErrorMessage);
    }

    /**
     * Checks if the terms error message is visible.
     * @returns {Promise<Boolean>} - Returns true if the error is visible.
     */
    async isTermsErrorVisible(): Promise<Boolean> {
        return await this.isElementVisible(this.termsErrorMessage);
    }
}
