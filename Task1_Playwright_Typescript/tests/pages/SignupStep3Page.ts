import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

/**
 * SignupStep3Page class represents the third step of the signup process.
 * It extends BasePage and provides methods to interact with step 3 elements.
 */
export class SignupStep3Page extends BasePage {
    private companyNameField: Locator;
    private countryDropdown: Locator;
    private countryDropdownValues: Locator;
    private hearAboutUsDropdown: Locator;
    private hearAboutUsDropdownValues: Locator;
    private createAccountButton: Locator;
    private backButton: Locator;
    private companyNameError: Locator;
    private hearAboutUsError: Locator;

    /**
     * Constructor to initialize the SignupStep3Page.
     * @param {Page} page - Playwright Page instance.
     */
    constructor(page: Page) {
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
     * Checks if the signup step 3 page is loaded.
     * @returns {Promise<Boolean>} - Returns true if the company name field is visible.
     */
    async isStep3PageLoaded(): Promise<Boolean> {
        return await this.isElementVisible(this.companyNameField);
    }

    /**
     * Clicks on the back button to return to the previous page.
     */
    async clickBackButton(): Promise<void> {
        await this.clickElement(this.backButton);
    }

    /**
     * Enters the provided company name into the company name field.
     * @param {string} companyNameText - Company name to be entered.
     */
    async enterCompanyName(companyNameText: string): Promise<void> {
        await this.fillFormField(this.companyNameField, companyNameText);
    }

    /**
     * Selects a country from the country dropdown.
     * @param {string} countryText - Country name to be selected.
     */
    async selectCountry(countryText: string): Promise<void> {
        await this.selectDynamicDropDown(this.countryDropdown, this.countryDropdownValues, countryText);
    }

    /**
     * Selects an option from the "How did you hear about us?" dropdown.
     * @param {string} hearAboutUsText - Selection text for the dropdown.
     */
    async selectHearAboutUs(hearAboutUsText: string): Promise<void> {
        await this.selectDynamicDropDown(this.hearAboutUsDropdown, this.hearAboutUsDropdownValues, hearAboutUsText);
    }

    /**
     * Clicks on the "Create Account" button to proceed to the next step.
     */
    async clickCreateAccount(): Promise<void> {
        await this.clickElement(this.createAccountButton);
    }

    /**
     * Fills the company details form with company name, country, and how the user heard about Circula.
     * @param {string} companyNameText - Company name to be entered.
     * @param {string} countryText - Country name to be selected.
     * @param {string} hearAboutUsText - Selection text for the "How did you hear about us?" dropdown.
     */
    async fillCompanyDetails(companyNameText: string, countryText: string, hearAboutUsText: string): Promise<void> {
        await this.enterCompanyName(companyNameText);
        await this.selectCountry(countryText);
        await this.selectHearAboutUs(hearAboutUsText);
    }

    /**
     * Checks if the "Create Account" button is enabled.
     * @returns {Promise<Boolean>} - Returns true if the button is clickable.
     */
    async isSubmitButtonEnabled(): Promise<Boolean> {
        return await this.isElementClickable(this.createAccountButton);
    }

    /**
     * Retrieves the currently selected country from the dropdown.
     * @returns {Promise<string>} - Returns the selected country as a string.
     */
    async getSelectedCountry(): Promise<string> {
        return await this.getSelectedDropdownValue(this.countryDropdown);
    }

    /**
     * Checks if the company name error message is visible.
     * @returns {Promise<Boolean>} - Returns true if the error message is visible.
     */
    async isCompanyNameErrorVisible(): Promise<Boolean> {
        return await this.isElementVisible(this.companyNameError);
    }

    /**
     * Checks if the "How did you hear about us?" error message is visible.
     * @returns {Promise<Boolean>} - Returns true if the error message is visible.
     */
    async isHearAboutUsErrorVisible(): Promise<Boolean> {
        return await this.isElementVisible(this.hearAboutUsError);
    }
}
