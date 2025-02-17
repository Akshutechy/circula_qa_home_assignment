import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

/**
 * Represents the third step of the signup process.
 * Extends `BasePage` to inherit common web interactions.
 */
export class SignupStep3Page extends BasePage {
    /**
     * Locators for various elements on the signup step 3 page.
     * @type {Locator}
     */
    companyNameField;
    countryDropdown;
    countryDropdownValues;
    hearAboutUsDropdown;
    hearAboutUsDropdownValues;
    createAccountButton;
    backButton;
    companyNameError;
    hearAboutUsError;

    /**
     * Initializes the SignupStep3Page with locators.
     * @param {Page} page - Playwright Page instance.
     */
    constructor(page) {
        super(page);
        this.companyNameField = page.locator("input[name='organizationName']");
        this.countryDropdown = page.locator('input[name="country"]');
        this.countryDropdownValues = page.locator('div[data-testid="autocomplete-menu-portal"]>ul>li>div');
        this.hearAboutUsDropdown = page.locator('input[value="Choose channel"]');
        this.hearAboutUsDropdownValues = page.locator('div[role="menuitemradio"]');
        this.createAccountButton = page.locator("button:has-text('Create an account')");
        this.backButton = page.locator('button[type="button"]');
        this.companyNameError = page.locator("text=Company name is required"); 
        this.hearAboutUsError = page.locator("text=Please mention how you discovered Circula");
    }

    /**
     * Verifies if the signup step 3 page is loaded.
     * @returns {Promise<boolean>} Resolves to `true` if the company name field is visible.
     */
    async isStep3PageLoaded() {
        return await this.isElementVisible(this.companyNameField);
    }

    /**
     * Clicks the "Back" button to navigate to the previous page.
     * @returns {Promise<void>} Resolves after clicking the button.
     */
    async clickBackButton() {
        await this.clickElement(this.backButton);
    }

    /**
     * Inputs the provided company name into the company name field.
     * @param {string} companyNameText - The company name to be entered.
     * @returns {Promise<void>} Resolves after entering the company name.
     */
    async enterCompanyName(companyNameText) {
        await this.fillFormField(this.companyNameField, companyNameText);
    }

    /**
     * Selects a country from the country dropdown.
     * @param {string} countryText - The country to select.
     * @returns {Promise<void>} Resolves after selecting the country.
     */
    async selectCountry(countryText) {
        await this.selectDynamicDropDown(this.countryDropdown, this.countryDropdownValues, countryText);
    }

    /**
     * Selects an option in the "How did you hear about us?" dropdown.
     * @param {string} hearAboutUsText - The option to select.
     * @returns {Promise<void>} Resolves after selecting the option.
     */
    async selectHearAboutUs(hearAboutUsText) {
        await this.selectDynamicDropDown(this.hearAboutUsDropdown, this.hearAboutUsDropdownValues, hearAboutUsText);
    }

    /**
     * Clicks the "Create Account" button to submit the form.
     * @returns {Promise<void>} Resolves after clicking the button.
     */
    async clickCreateAccount() {
        await this.clickElement(this.createAccountButton);
    }

    /**
     * Completes step 3 of the signup process by entering company details and selecting required dropdowns.
     * @param {string} companyNameText - The company name to be entered.
     * @param {string} countryText - The country to be selected.
     * @param {string} hearAboutUsText - The option for "How did you hear about us?".
     * @returns {Promise<void>} Resolves after completing step 3.
     */
    async fillCompanyDetails(companyNameText, countryText, hearAboutUsText) {
        await this.enterCompanyName(companyNameText);
        await this.selectCountry(countryText);
        await this.selectHearAboutUs(hearAboutUsText);
    }

    /**
     * Checks if the "Create Account" button is enabled.
     * @returns {Promise<boolean>} Resolves to `true` if the button is clickable.
     */
    async isSubmitButtonEnabled() {
        return await this.isElementClickable(this.createAccountButton);
    }

    /**
     * Retrieves the currently selected country from the dropdown.
     * @returns {Promise<string>} Resolves to the selected country.
     */
    async getSelectedCountry() {
        return await this.getSelectedDropdownValue(this.countryDropdown);
    }

    /**
     * Checks if the company name error message is displayed.
     * @returns {Promise<boolean>} Resolves to `true` if the error message is visible.
     */
    async isCompanyNameErrorVisible() {
        return await this.isElementVisible(this.companyNameError);
    }

    /**
     * Checks if the "How did you hear about us?" error message is displayed.
     * @returns {Promise<boolean>} Resolves to `true` if the error message is visible.
     */
    async isHearAboutUsErrorVisible() {
        return await this.isElementVisible(this.hearAboutUsError);
    }
}
