import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

/**
 * LoginPage class represents the login screen of the application.
 * It extends BasePage and provides methods to interact with login-related elements.
 */
export class LoginPage extends BasePage {
    private startFreeTrialButton: Locator;

    /**
     * Constructor to initialize the LoginPage.
     * @param {Page} page - Playwright Page instance.
     */
    constructor(page: Page) {
        super(page);
        this.startFreeTrialButton = page.locator('text=Start a free trial');
    }

    /**
     * Clicks on the "Start a free trial" button.
     * - Ensures cookies are accepted before interacting with the button.
     * - Uses the BasePage method to perform the click.
     */
    async clickStartFreeTrial(): Promise<void> {
        await this.acceptCookiesIfPresent();
        await this.clickElement(this.startFreeTrialButton);
    }
}
