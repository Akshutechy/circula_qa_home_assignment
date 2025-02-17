import BasePage from './BasePage';

/**
 * Represents the third step of the signup process.
 * Extends `BasePage` to inherit common web interactions.
 */
class SignupStep3Page extends BasePage {

    /**
     * Locators for various elements on the signup step 3 page.
     */
    companyNameField = "input[name='organizationName']";
    countryDropdown = 'input[name="country"]';
    countryDropdownValues = 'div[data-testid="autocomplete-menu-portal"]>ul>li>div';
    hearAboutUsDropdown = 'input[value="Choose channel"]';
    hearAboutUsDropdownValues = 'div[role="menuitemradio"]';
    createAccountButton = 'Create an account';
    backButton = 'button[type="button"]';
    companyNameError = "Company name is required";
    hearAboutUsError = "Please mention how you discovered Circula";

    /**
     * Verifies if the signup step 3 page is loaded.
     */
    isStep3PageLoaded() {
        return this.selectElement(this.companyNameField, 'get').should('be.visible');
    }

    /**
     * Clicks the "Back" button to navigate to the previous page.
     */
    clickBackButton() {
        this.selectElement(this.backButton, 'get').click();
    }

    /**
     * Inputs the provided company name into the company name field.
     * @param {string} companyNameText - The company name to be entered.
     */
    enterCompanyName(companyNameText) {
        this.selectElement(this.companyNameField, 'get').clear().type(companyNameText);
    }

    /**
     * Selects a country from the country dropdown.
     * @param {string} countryText - The country to select.
     */
    selectCountry(countryText) {
        this.selectElement(this.countryDropdown, 'get').click();
        this.selectElement(this.countryDropdownValues, 'get').contains(countryText).click();
    }

    /**
     * Selects an option in the "How did you hear about us?" dropdown.
     * @param {string} hearAboutUsText - The option to select.
     */
    selectHearAboutUs(hearAboutUsText) {
        this.selectElement(this.hearAboutUsDropdown, 'get').click();
        this.selectElement(this.hearAboutUsDropdownValues, 'get').contains(hearAboutUsText).click();
    }

    /**
     * Clicks the "Create Account" button to submit the form.
     */
    clickCreateAccount() {
        this.selectElement(this.createAccountButton, 'contains').click();
    }

    /**
     * Completes step 3 of the signup process by entering company details and selecting required dropdowns.
     * @param {string} companyNameText - The company name to be entered.
     * @param {string} countryText - The country to be selected.
     * @param {string} hearAboutUsText - The option for "How did you hear about us?".
     */
    fillCompanyDetails(companyNameText, countryText, hearAboutUsText) {
        this.enterCompanyName(companyNameText);
        this.selectCountry(countryText);
        this.selectHearAboutUs(hearAboutUsText);
    }

    /**
     * Checks if the "Create Account" button is enabled.
     */
    isSubmitButtonEnabled() {
        return this.selectElement(this.createAccountButton, 'contains').should('be.enabled');
    }

    /**
     * Retrieves the currently selected country from the dropdown.
     */
    getSelectedCountry() {
        return this.selectElement(this.countryDropdown, 'get').invoke('val');
    }

    /**
  * Checks if the company name error message is displayed.
  */
    isCompanyNameErrorVisible() {
        this.selectElement('label:contains("Company name is required")', 'get')
            .scrollIntoView()
            .should('be.visible');
    }

    /**
     * Checks if the "How did you hear about us?" error message is displayed.
     */
    isHearAboutUsErrorVisible() {
        return this.selectElement(this.hearAboutUsError, 'contains').should('be.visible');
    }
}

export default SignupStep3Page;
