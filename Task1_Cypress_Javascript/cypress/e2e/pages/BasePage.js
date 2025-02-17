/**
 * BasePage class provides reusable utility methods for interacting with web pages in Cypress.
 * This serves as the foundation for all page objects, offering common actions like:
 * - Clicking elements
 * - Filling forms
 * - Handling dropdowns
 * - Waiting for elements
 * - Taking screenshots
 */
class BasePage {

    /**
     * Determines the method to use for selecting elements.
     * @param {string} selector - The selector or text to locate the element.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     * @returns {Cypress.Chainable} The Cypress chainable object for further actions.
     */
    selectElement(selector, method = 'get') {
        switch (method) {
            case 'contains':
                return cy.contains(selector);
            case 'xpath':
                return cy.xpath(selector);
            default:
                return cy.get(selector);
        }
    }

    /**
     * Navigates to a specified URL.
     * @param {string} url - The URL to navigate to.
     */
    navigateTo(url) {
        cy.visit(url);
    }

    /**
     * Clicks on a specified element.
     * @param {string} selector - The selector or text of the element to be clicked.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     */
    clickElement(selector, method = 'get') {
        this.selectElement(selector, method).click();
    }

    /**
     * Fills a form field with a specified value.
     * @param {string} selector - The selector or text of the input field.
     * @param {string} value - The value to enter in the field.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     */
    fillFormField(selector, value, method = 'get') {
        this.selectElement(selector, method).clear().type(value);
    }

    /**
     * Selects a checkbox.
     * @param {string} selector - The selector or text of the checkbox.
     * @param {boolean} [isForce=false] - Whether to force the action.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     */
    selectCheckBox(selector, isForce = false, method = 'get') {
        this.selectElement(selector, method).check({ force: isForce });
    }

    /**
     * Retrieves and returns the inner text of an element.
     * @param {string} selector - The selector or text of the element.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     * @returns {Cypress.Chainable<string>} The inner text of the element.
     */
    getElementText(selector, method = 'get') {
        return this.selectElement(selector, method).invoke('text');
    }

    /**
     * Waits until an element becomes visible on the page.
     * @param {string} selector - The selector or text of the element.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     */
    waitForElementVisible(selector, method = 'get') {
        this.selectElement(selector, method).should('be.visible');
    }

    /**
     * Waits until an element is hidden from the page.
     * @param {string} selector - The selector or text of the element.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     */
    waitForElementHidden(selector, method = 'get') {
        this.selectElement(selector, method).should('not.exist');
    }

    /**
     * Captures a screenshot of the current page.
     * @param {string} fileName - The file path to save the screenshot.
     */
    takeScreenshot(fileName) {
        cy.screenshot(fileName);
    }

    /**
     * Selects an option from a static dropdown menu.
     * @param {string} selector - The selector or text of the dropdown.
     * @param {string} dropDownText - The visible text of the option to select.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     */
    selectStaticDropDown(selector, dropDownText, method = 'get') {
        this.selectElement(selector, method).select(dropDownText);
    }

    /**
     * Retrieves the currently selected value of a dropdown field.
     * @param {string} selector - The selector or text of the dropdown.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     * @returns {Cypress.Chainable<string>} The selected value.
     */
    getSelectedDropdownValue(selector, method = 'get') {
        return this.selectElement(selector, method).invoke('val');
    }

    /**
     * Checks if an element is visible and enabled (clickable).
     * @param {string} selector - The selector or text of the element.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     * @returns {Cypress.Chainable<boolean>} True if the element is clickable, otherwise false.
     */
    isElementClickable(selector, method = 'get') {
        return this.selectElement(selector, method).should('be.visible').and('be.enabled');
    }

    /**
     * Checks if an element is visible on the page.
     * @param {string} selector - The selector or text of the element.
     * @param {string} method - The method to use: 'get', 'contains', or 'xpath'.
     * @returns {Cypress.Chainable<boolean>} True if the element is visible, otherwise false.
     */
    isElementVisible(selector, method = 'get') {
        return this.selectElement(selector, method).should('be.visible');
    }

    /**
     * Selects an option from a dynamic dropdown menu.
     * - Ensures the dropdown opens.
     * - Waits for options to appear.
     * - Clicks the correct option.
     * 
     * @param {string} dropdownSelector - The dropdown selector.
     * @param {string} dropdownOptionsSelector - The options selector.
     * @param {string} dropDownText - The visible text of the option to select.
     * @param {string} method - The method to use for the dropdown options: 'get', 'contains', or 'xpath'.
     */
    selectDynamicDropDown(dropdownSelector, dropdownOptionsSelector, dropDownText, method = 'get') {
        this.selectElement(dropdownSelector).click();
        this.selectElement(dropdownOptionsSelector, method).contains(dropDownText).click();
    }

    /**
     * Accepts cookies if a cookie consent banner is present.
     * - Waits for the accept button for up to 5 seconds.
     * - Clicks the button if found.
     */
    acceptCookiesIfPresent() {
        cy.get('div#usercentrics-root') // Adjust the selector to target the shadow host
            .shadow()
            .find('[data-testid="uc-accept-all-button"]')
            .should('be.visible')
            .click({ force: true })
            .then(() => {
                cy.log('✅ Accepted cookies');
            });
    }
    
    
}

export default BasePage;
