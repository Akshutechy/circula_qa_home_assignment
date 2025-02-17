import BasePage from './BasePage';

/**
 * Represents the second step of the signup process.
 * Extends `BasePage` to inherit common web interactions.
 */
class SignupStep2Page extends BasePage {

    /**
     * Locators for various elements on the signup step 2 page.
     */
    firstNameField = "input[name='firstname']";
    lastNameField = "input[name='lastname']";
    phoneField = "input[name='phoneNumber']";
    nextButton = "button[type='submit']";
    backButton = 'button[type="button"]';
    firstNameError = "First name is required.";
    lastNameError = "Last name is required.";

    /**
 * Verifies if the signup step 2 page is loaded.
 */
    isStep2PageLoaded() {
        return this.selectElement(this.firstNameField, 'get')
            .scrollIntoView()
            .should('be.visible');
    }

    /**
     * Clicks the "Back" button to navigate to the previous page.
     */
    clickBackButton() {
        this.selectElement(this.backButton, 'get').click();
    }

    /**
     * Inputs the provided first name into the first name field.
     * @param {string} firstNameText - The first name to be entered.
     */
    enterFirstName(firstNameText) {
        this.selectElement(this.firstNameField, 'get').clear().type(firstNameText);
    }

    /**
     * Inputs the provided last name into the last name field.
     * @param {string} lastNameText - The last name to be entered.
     */
    enterLastName(lastNameText) {
        this.selectElement(this.lastNameField, 'get').clear().type(lastNameText);
    }

    /**
     * Inputs the provided phone number into the phone field.
     * @param {string} phoneNumberText - The phone number to be entered.
     */
    enterPhoneNumber(phoneNumberText) {
        this.selectElement(this.phoneField, 'get').clear().type(phoneNumberText);
    }

    /**
     * Clicks the "Next" button to proceed to the next step of signup.
     */
    clickNextButton() {
        this.selectElement(this.nextButton, 'get').click();
    }

    /**
     * Completes step 2 of the signup process by entering first name, last name, 
     * and phone number, then clicking "Next".
     * @param {string} firstNameText - The first name to be entered.
     * @param {string} lastNameText - The last name to be entered.
     * @param {string} phoneNumberText - The phone number to be entered.
     */
    fillPersonalDetails(firstNameText, lastNameText, phoneNumberText) {
        this.enterFirstName(firstNameText);
        this.enterLastName(lastNameText);
        this.enterPhoneNumber(phoneNumberText);
        this.clickNextButton();
    }

    /**
  * Checks if the first name error message is displayed.
  */
    isFirstNameErrorVisible() {
        this.selectElement('label:contains("First name is required.")', 'get')
            .scrollIntoView()
            .should('be.visible');
    }

    /**
     * Checks if the last name error message is displayed.
     */
    isLastNameErrorVisible() {
        return this.selectElement(this.lastNameError, 'contains').should('be.visible');
    }
}

export default SignupStep2Page;
