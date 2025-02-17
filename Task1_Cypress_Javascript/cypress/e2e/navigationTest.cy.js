/// <reference types="cypress" />

import { completeSignupStep1, completeSignupStep2 } from '../support/signupHelper';
import { getTestData } from '../support/testDataHelper';
import LoginPage from '../e2e/pages/LoginPage';
import SignupStep1Page from '../e2e/pages/SignupStep1Page';
import SignupStep2Page from '../e2e/pages/SignupStep2Page';
import SignupStep3Page from '../e2e/pages/SignupStep3Page';

describe('Navigation Tests for Signup Flow', () => {
  let testData;
  const loginPage = new LoginPage();
  const signupStep1Page = new SignupStep1Page();
  const signupStep2Page = new SignupStep2Page();
  const signupStep3Page = new SignupStep3Page();

  beforeEach(() => {
    testData = getTestData();  // Load test data before each test
  });

  /**
   * ✅ Test: Validate Navigation from Login Page to Signup Page
   *
   * Steps:
   * 1. Navigate to the base URL.
   * 2. Click the "Start Free Trial" button.
   * 3. Verify the redirection to the signup page.
   */
  it('Login Page - Signup Page Navigation', () => {
    cy.visit('/');
    loginPage.clickStartFreeTrial();
    cy.url().should('eq', 'https://app.circula.com/users/sign_up');  // Validate redirection
  });

  /**
   * ✅ Test: Validate Navigation Between Step 1 and Step 2 of Signup
   *
   * Steps:
   * 1. Navigate to the signup page.
   * 2. Complete Step 1 with test data (email & password).
   * 3. Verify that Step 2 is loaded.
   * 4. Click the back button and verify return to Step 1.
   */
  it('Step 1 <-> Step 2 Page Navigation', () => {
    cy.visit('/users/sign_up');

    signupStep1Page.fillSignupForm(testData.email, testData.password);
    signupStep2Page.isStep2PageLoaded();

    signupStep2Page.clickBackButton();  // Click Back Button
    signupStep1Page.isStep1PageLoaded();  // Step 1 should be loaded
  });

  /**
   * ✅ Test: Validate Navigation Between Step 2 and Step 3 of Signup
   *
   * Steps:
   * 1. Navigate to the signup page.
   * 2. Complete Step 1 (email & password).
   * 3. Complete Step 2 (personal details: first name, last name, phone number).
   * 4. Verify that Step 3 is loaded.
   * 5. Click the back button and verify return to Step 2.
   */
  it('Step 2 <-> Step 3 Page Navigation', () => {
    cy.visit('/users/sign_up');

    signupStep1Page.fillSignupForm(testData.email, testData.password);
    signupStep2Page.fillPersonalDetails(testData.firstName, testData.lastName, testData.phoneNumber);
    signupStep3Page.isStep3PageLoaded();

    signupStep3Page.clickBackButton();  // Click Back Button
    signupStep2Page.isStep2PageLoaded();  // Step 2 should be loaded
  });
});
