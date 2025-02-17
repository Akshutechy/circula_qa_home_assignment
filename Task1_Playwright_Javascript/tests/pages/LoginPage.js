import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

/**
 * Represents the login page of the application.
 * Extends `BasePage` to inherit common functionalities.
 */
export class LoginPage extends BasePage {
    /**
     * Locator for the "Start a free trial" button.
     * @type {Locator}
     */
    startFreeTrialButton;

    /**
     * Initializes the LoginPage with necessary locators.
     * @param {Page} page - Playwright Page instance.
     */
    constructor(page) {
        super(page);
        this.startFreeTrialButton = page.locator('text=Start a free trial');
    }

    /**
     * Clicks on the "Start a Free Trial" button.
     * - Ensures cookies are accepted before interaction.
     * - Uses BasePage's `clickElement` method for the action.
     * @returns {Promise<void>} Resolves when the button is clicked.
     */
    async clickStartFreeTrial() {
        await this.acceptCookiesIfPresent();
        await this.clickElement(this.startFreeTrialButton);
    }
}
