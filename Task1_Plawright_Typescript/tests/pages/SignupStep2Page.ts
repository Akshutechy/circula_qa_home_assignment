import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

/**
 * SignupStep2Page class represents the second step of the signup process.
 * It extends BasePage and provides methods to interact with the step 2 elements.
 */
export class SignupStep2Page extends BasePage {
    private firstNameField: Locator;
    private lastNameField: Locator;
    private phoneField: Locator;
    private nextButton: Locator;
    private backButton: Locator;
    private firstNameError: Locator;
    private lastNameError: Locator;

    /**
     * Constructor to initialize the SignupStep2Page.
     * @param {Page} page - Playwright Page instance.
     */
    constructor(page: Page) {
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
     * Checks if the signup step 2 page is loaded.
     * @returns {Promise<Boolean>} - Returns true if the first name field is visible.
     */
    async isStep2PageLoaded(): Promise<Boolean> {
        return await this.isElementVisible(this.firstNameField);
    }

    /**
     * Clicks on the back button to return to the previous page.
     */
    async clickBackButton(): Promise<void> {
        await this.clickElement(this.backButton);
    }

    /**
     * Enters the provided first name into the first name field.
     * @param {string} firstNameText - First name to be entered.
     */
    async enterFirstName(firstNameText: string): Promise<void> {
        await this.fillFormField(this.firstNameField, firstNameText);
    }

    /**
     * Enters the provided last name into the last name field.
     * @param {string} lastNameText - Last name to be entered.
     */
    async enterLastName(lastNameText: string): Promise<void> {
        await this.fillFormField(this.lastNameField, lastNameText);
    }

    /**
     * Enters the provided phone number into the phone number field.
     * @param {string} phoneNumberText - Phone number to be entered.
     */
    async enterPhoneNumber(phoneNumberText: string): Promise<void> {
        await this.fillFormField(this.phoneField, phoneNumberText);
    }

    /**
     * Clicks on the "Next" button to proceed to the next step.
     */
    async clickNextButton(): Promise<void> {
        await this.clickElement(this.nextButton);
    }

    /**
     * Fills the personal details form with first name, last name, and phone number, then clicks "Next".
     * @param {string} firstNameText - First name to be entered.
     * @param {string} lastNameText - Last name to be entered.
     * @param {string} phoneNumberText - Phone number to be entered.
     */
    async fillPersonalDetails(firstNameText: string, lastNameText: string, phoneNumberText: string): Promise<void> {
        await this.enterFirstName(firstNameText);
        await this.enterLastName(lastNameText);
        await this.enterPhoneNumber(phoneNumberText);
        await this.clickNextButton();
    }

    /**
     * Checks if the first name error message is visible.
     * @returns {Promise<Boolean>} - Returns true if the error is visible.
     */
    async isFirstNameErrorVisible(): Promise<Boolean> {
        return await this.isElementVisible(this.firstNameError);
    }

    /**
     * Checks if the last name error message is visible.
     * @returns {Promise<Boolean>} - Returns true if the error is visible.
     */
    async isLastNameErrorVisible(): Promise<Boolean> {
        return await this.isElementVisible(this.lastNameError);
    }
}
