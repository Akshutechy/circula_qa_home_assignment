import { test, expect } from '../fixtures/pomFixtures';
import { getTestData } from '../tests/helper/testDataHelper';

/**
 * E2E Test: Signup Flow from Login to Success
 * 
 * This test performs an end-to-end signup flow by:
 * 1. Navigating to the login page.
 * 2. Clicking on the "Start Free Trial" button.
 * 3. Filling out step 1 of the signup form (email & password).
 * 4. Completing step 2 (personal details: first name, last name, phone number).
 * 5. Completing step 3 (company details: company name, country, and referral source).
 * 6. Validating that the selected country is correctly displayed.
 * 7. Verifying that the "Create Account" button is enabled at the end of the flow.
 */
test('E2E Signup Flow - Login to Success', async ({ loginPage, signupStep1Page, signupStep2Page, signupStep3Page }) => {
    // Retrieve dynamically generated test data
    const testData = getTestData();

    // Step 1: Navigate to the login page and initiate signup
    await loginPage.navigateTo('/');
    await loginPage.clickStartFreeTrial();

    // Step 2: Fill in signup form details
    await signupStep1Page.fillSignupForm(testData.email, testData.password);
    await signupStep2Page.fillPersonalDetails(testData.firstName, testData.lastName, testData.phoneNumber);
    await signupStep3Page.fillCompanyDetails(testData.companyName, testData.country, testData.hearAboutUs);

    // Step 3: Validate that the correct country is selected
    const selectedCountry = await signupStep3Page.getSelectedCountry();
    expect(selectedCountry).toBe(testData.country);

    // Step 4: Verify that the submit button is enabled for account creation
    expect(await signupStep3Page.isSubmitButtonEnabled()).toBe(true);
});
