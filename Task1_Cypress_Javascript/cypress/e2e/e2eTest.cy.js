/// <reference types="cypress" />

import { getTestData } from '../support/testDataHelper';
import LoginPage from '../e2e/pages/LoginPage';
import SignupStep1Page from '../e2e/pages/SignupStep1Page';
import SignupStep2Page from '../e2e/pages/SignupStep2Page';
import SignupStep3Page from '../e2e/pages/SignupStep3Page';

describe('E2E Signup Flow - Login to Success', () => {
    let testData;
    const loginPage = new LoginPage();
    const signupStep1Page = new SignupStep1Page();
    const signupStep2Page = new SignupStep2Page();
    const signupStep3Page = new SignupStep3Page();

    beforeEach(() => {
        testData = getTestData();  // Load test data before each test
    });

    it('Should complete the full signup process successfully', () => {
        // Step 1: Navigate to the login page and initiate signup
        cy.visit('/');
        loginPage.clickStartFreeTrial();

        // Step 2: Fill in signup form details
        signupStep1Page.fillSignupForm(testData.email, testData.password);
        signupStep2Page.fillPersonalDetails(testData.firstName, testData.lastName, testData.phoneNumber);
        signupStep3Page.fillCompanyDetails(testData.companyName, testData.country, testData.hearAboutUs);

        // // Step 3: Validate that the correct country is selected
        signupStep3Page.getSelectedCountry().should('eq', testData.country);

        // // Step 4: Verify that the submit button is enabled for account creation
        signupStep3Page.isSubmitButtonEnabled();
    });
});
