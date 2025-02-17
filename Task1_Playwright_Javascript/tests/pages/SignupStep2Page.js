import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

/**
 * Represents the second step of the signup process.
 * Extends `BasePage` to inherit common web interactions.
 */
export class SignupStep2Page extends BasePage {
    /**
     * Locators for various elements on the signup step 2 page.
     * @type {Locator}
     */
    firstNameField;
    lastNameField;
    phoneField;
    nextButton;
    backButton;
    firstNameError;
    lastNameError;

    /**
     * Initializes the SignupStep2Page with locators.
     * @param {Page} page - Playwright Page instance.
     */
    constructor(page) {
        super(page);
        this.firstNameField = page.locator("input[name='firstname']");
        this.lastNameField = page.locator("input[name='lastname']");
        this.phoneField = page.locator("input[name='phoneNumber']");
        this.nextButton = page.locator("button[type='submit']");
        this.backButton = page.locator('button[type="button"]');
        this.firstNameError = page.locator("text=First name is required.");
        this.lastNameError = page.locator("text=Last name is required.");
    }

    /**
     * Verifies if the signup step 2 page is loaded.
     * @returns {Promise<boolean>} Resolves to `true` if the first name field is visible.
     */
    async isStep2PageLoaded() {
        return await this.isElementVisible(this.firstNameField);
    }

    /**
     * Clicks the "Back" button to navigate to the previous page.
     * @returns {Promise<void>} Resolves after the button is clicked.
     */
    async clickBackButton() {
        await this.clickElement(this.backButton);
    }

    /**
     * Inputs the provided first name into the first name field.
     * @param {string} firstNameText - The first name to be entered.
     * @returns {Promise<void>} Resolves after entering the first name.
     */
    async enterFirstName(firstNameText) {
        await this.fillFormField(this.firstNameField, firstNameText);
    }

    /**
     * Inputs the provided last name into the last name field.
     * @param {string} lastNameText - The last name to be entered.
     * @returns {Promise<void>} Resolves after entering the last name.
     */
    async enterLastName(lastNameText) {
        await this.fillFormField(this.lastNameField, lastNameText);
    }

    /**
     * Inputs the provided phone number into the phone field.
     * @param {string} phoneNumberText - The phone number to be entered.
     * @returns {Promise<void>} Resolves after entering the phone number.
     */
    async enterPhoneNumber(phoneNumberText) {
        await this.fillFormField(this.phoneField, phoneNumberText);
    }

    /**
     * Clicks the "Next" button to proceed to the next step of signup.
     * @returns {Promise<void>} Resolves after clicking the button.
     */
    async clickNextButton() {
        await this.clickElement(this.nextButton);
    }

    /**
     * Completes step 2 of the signup process by entering first name, last name, 
     * and phone number, then clicking "Next".
     * @param {string} firstNameText - The first name to be entered.
     * @param {string} lastNameText - The last name to be entered.
     * @param {string} phoneNumberText - The phone number to be entered.
     * @returns {Promise<void>} Resolves after completing step 2.
     */
    async fillPersonalDetails(firstNameText, lastNameText, phoneNumberText) {
        await this.enterFirstName(firstNameText);
        await this.enterLastName(lastNameText);
        await this.enterPhoneNumber(phoneNumberText);
        await this.clickNextButton();
    }

    /**
     * Checks if the first name error message is displayed.
     * @returns {Promise<boolean>} Resolves to `true` if the first name error is visible.
     */
    async isFirstNameErrorVisible() {
        return await this.isElementVisible(this.firstNameError);
    }

    /**
     * Checks if the last name error message is displayed.
     * @returns {Promise<boolean>} Resolves to `true` if the last name error is visible.
     */
    async isLastNameErrorVisible() {
        return await this.isElementVisible(this.lastNameError);
    }
}
