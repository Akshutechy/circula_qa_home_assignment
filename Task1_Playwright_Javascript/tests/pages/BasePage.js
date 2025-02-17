import { Locator, Page } from "@playwright/test";

/**
 * BasePage class provides reusable utility methods for interacting with web pages.
 * This serves as the foundation for all page objects, offering common actions like:
 * - Clicking elements
 * - Filling forms
 * - Handling dropdowns
 * - Waiting for elements
 * - Taking screenshots
 */
export default class BasePage {
    page;

    /**
     * Initializes the BasePage with a Playwright Page instance.
     * @param {Page} page - Playwright Page instance
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigates to a specified URL.
     * @param {string} url - The URL to navigate to.
     */
    async navigateTo(url) {
        await this.page.goto(url);
    }

    /**
     * Clicks on a specified element.
     * @param {Locator} element - The element to be clicked.
     */
    async clickElement(element) {
        await element.click();
    }

    /**
     * Fills a form field with a specified value.
     * @param {Locator} element - The input field locator.
     * @param {string} value - The value to enter in the field.
     */
    async fillFormField(element, value) {
        await element.fill(value);
    }

    /**
     * Selects a checkbox.
     * @param {Locator} element - The checkbox locator.
     * @param {boolean} [isForce=false] - Whether to force the action.
     */
    async selectCheckBox(element, isForce = false) {
        await element.check({ force: isForce });
    }

    /**
     * Retrieves and returns the inner text of an element.
     * @param {Locator} element - The element locator.
     * @returns {Promise<string>} The inner text of the element.
     */
    async getElementText(element) {
        return element.innerText();
    }

    /**
     * Waits until an element becomes visible on the page.
     * @param {Locator | string} element - The element locator or selector string.
     */
    async waitForElementVisible(element) {
        if (typeof element === 'string') {
            await this.page.waitForSelector(element, { state: 'visible' });
        } else {
            await element.waitFor({ state: 'visible' });
        }
    }

    /**
     * Waits until an element is hidden from the page.
     * @param {Locator} element - The element locator.
     */
    async waitForElementHidden(element) {
        if (typeof element === 'string') {
            await this.page.waitForSelector(element, { state: 'hidden' });
        } else {
            await element.waitFor({ state: 'hidden' });
        }
    }

    /**
     * Captures a screenshot of the current page.
     * @param {string} fileName - The file path to save the screenshot.
     */
    async takeScreenshot(fileName) {
        await this.page.screenshot({ path: fileName });
    }

    /**
     * Selects an option from a static dropdown menu.
     * @param {Locator} element - The dropdown locator.
     * @param {string} dropDownText - The visible text of the option to select.
     */
    async selectStaticDropDown(element, dropDownText) {
        await element.selectOption({ label: dropDownText });
    }

    /**
     * Retrieves the currently selected value of a dropdown field.
     * @param {Locator} dropdownLocator - The dropdown field locator.
     * @returns {Promise<string>} The selected value.
     */
    async getSelectedDropdownValue(dropdownLocator) {
        return await dropdownLocator.inputValue();
    }

    /**
     * Checks if an element is visible and enabled (clickable).
     * @param {Locator} element - The element locator.
     * @returns {Promise<boolean>} True if the element is clickable, otherwise false.
     */
    async isElementClickable(element) {
        return await element.isEnabled() && await element.isVisible();
    }

    /**
     * Checks if an element is visible on the page.
     * @param {Locator} element - The element locator.
     * @returns {Promise<boolean>} True if the element is visible, otherwise false.
     */
    async isElementVisible(element) {
        return await element.isVisible();
    }

    /**
     * Selects an option from a dynamic dropdown menu.
     * This method ensures the dropdown opens, waits for options to appear, and retries if needed.
     * 
     * @param {Locator} dropdownLocator - The dropdown locator.
     * @param {Locator} dropdownValuesLocator - The locator for dropdown options.
     * @param {string} dropDownText - The visible text of the option to select.
     */
    async selectDynamicDropDown(dropdownLocator, dropdownValuesLocator, dropDownText) {
        await dropdownLocator.click();
        await dropdownValuesLocator.first().waitFor({ state: 'visible', timeout: 5000 });

        const optionLocator = dropdownValuesLocator.locator(`text=${dropDownText}`);

        await optionLocator.waitFor({ state: 'visible', timeout: 5000 });
        await optionLocator.scrollIntoViewIfNeeded();

        // Retry mechanism for flaky dropdowns
        for (let i = 0; i < 3; i++) {
            try {
                await optionLocator.hover();
                await this.page.waitForTimeout(200);
                await optionLocator.click({ force: true, trial: false });
                return;
            } catch (e) {
                console.log(`🔄 Retry clicking ${dropDownText} (attempt ${i + 1})`);

                await this.page.evaluate((el) => {
                    if (el instanceof HTMLElement) el.click();
                }, await optionLocator.elementHandle());

                await this.page.waitForTimeout(200);
            }
        }

        throw new Error(`❌ Failed to click on ${dropDownText}`);
    }

    /**
     * Accepts cookies if a cookie consent banner is present.
     * 
     * - Waits for the accept button for up to 5 seconds.
     * - Clicks the button if found, otherwise logs that it wasn't detected.
     */
    async acceptCookiesIfPresent() {
        const acceptAllButton = this.page.locator('[data-testid="uc-accept-all-button"]');

        try {
            await acceptAllButton.waitFor({ state: 'visible', timeout: 5000 });
            await acceptAllButton.click();
        } catch (error) {
            console.log('Accept button not found within timeout.');
        }
    }
}
