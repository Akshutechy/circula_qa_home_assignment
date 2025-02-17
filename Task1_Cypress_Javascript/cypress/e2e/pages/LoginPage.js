import BasePage from './BasePage';

/**
 * Represents the login page of the application.
 * Extends `BasePage` to inherit common functionalities.
 */
class LoginPage extends BasePage {
    
    /**
     * Locator for the "Start a free trial" button.
     */
    startFreeTrialButton = 'Start a free trial';

    /**
     * Clicks on the "Start a Free Trial" button.
     * - Ensures cookies are accepted before interaction.
     * - Uses BasePage's `clickElement` method for the action.
     */
    clickStartFreeTrial() {
        this.acceptCookiesIfPresent();
        cy.wait(1000); // Small wait to ensure UI is stable
        this.clickElement(this.startFreeTrialButton, 'contains');
    }
}

export default LoginPage;
