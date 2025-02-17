import BasePage from './BasePage';

/**
 * Represents the first step of the signup process.
 * Extends `BasePage` to inherit common web interactions.
 */
class SignupStep1Page extends BasePage {
    
    /**
     * Locators for various elements on the signup step 1 page.
     */
    emailField = "input[name='email']";
    passwordField = "input[name='password']";
    termsCheckbox = '//input[@type="checkbox" and @name="acceptTos"]';
    tryForFreeButton = 'Try for free';

    // Updated selectors for error messages
    emailErrorMessage = 'div[role="alert"] .sc-2dade39b-0:contains("Work email is required.")';
    passwordErrorMessage = 'div.sc-2dade39b-0:contains("Min. 8 characters")';
    termsErrorMessage = 'div[role="alert"]:contains("Please accept the Terms and Conditions to continue.")';

    /**
 * Verifies if the signup step 1 page is loaded.
 */
isStep1PageLoaded() {
    return this.selectElement(this.emailField, 'get')
        .scrollIntoView()
        .should('be.visible');
}

    /**
     * Inputs the provided email into the email field.
     * @param {string} emailText - The email to be entered.
     */
    enterEmail(emailText) {
        this.selectElement(this.emailField, 'get').clear().type(emailText);
    }

    /**
     * Inputs the provided password into the password field.
     * @param {string} passwordText - The password to be entered.
     */
    enterPassword(passwordText) {
        this.selectElement(this.passwordField, 'get').clear().type(passwordText);
    }

    /**
     * Selects the "Terms and Conditions" checkbox.
     */
    selectTermsCheckbox() {
        cy.wait(2000);
        this.selectElement(this.termsCheckbox, 'xpath').click({ force: true });
    }

    /**
     * Clicks on the "Try for Free" button after accepting cookies.
     */
    clickTryForFree() {
        this.selectElement(this.tryForFreeButton, 'contains').click();
    }

    /**
     * Completes step 1 of the signup form by entering email, password, 
     * selecting the terms checkbox, and clicking "Try for Free".
     * @param {string} emailText - The email to be entered.
     * @param {string} passwordText - The password to be entered.
     */
    fillSignupForm(emailText, passwordText) {
        this.acceptCookiesIfPresent();
        this.enterEmail(emailText);
        this.enterPassword(passwordText);
        this.selectTermsCheckbox();
        this.clickTryForFree();
    }

    /**
     * Checks if the email error message is displayed.
     */
    isEmailErrorVisible() {
        this.selectElement(this.emailErrorMessage, 'get')
            .scrollIntoView()
            .should('be.visible');
    }

    /**
     * Checks if the password error message is displayed.
     */
    isPasswordErrorVisible() {
        this.selectElement(this.passwordErrorMessage, 'get').should('be.visible');
    }

    /**
     * Checks if the terms and conditions error message is displayed.
     */
    isTermsErrorVisible() {
        this.selectElement(this.termsErrorMessage, 'get').should('be.visible');
    }
}

export default SignupStep1Page;
