/// <reference types="cypress" />

import { completeSignupStep1, completeSignupStep2 } from '../support/signupHelper';
import SignupStep1Page from '../e2e/pages/SignupStep1Page';
import SignupStep2Page from '../e2e/pages/SignupStep2Page';
import SignupStep3Page from '../e2e/pages/SignupStep3Page';

/**
 * Test Suite: UI Validation Tests for Signup Flow
 *
 * This test suite verifies that UI validation messages appear correctly when
 * users attempt to proceed without providing required inputs.
 */

describe('UI Validation Tests for Signup Flow', () => {
  const signupStep1Page = new SignupStep1Page();
  const signupStep2Page = new SignupStep2Page();
  const signupStep3Page = new SignupStep3Page();

  /**
   * ✅ Test: Validate UI Error Messages on Step 1 (Email, Password, Terms)
   *
   * Steps:
   * 1. Navigate to the signup page.
   * 2. Click the "Try for Free" button without filling any fields.
   * 3. Validate that error messages appear for:
   *    - Missing email
   *    - Missing password
   *    - Unchecked terms checkbox
   */
  it('Step 1 page UI Validation', () => {
    cy.visit('/users/sign_up');
    signupStep1Page.acceptCookiesIfPresent();
    signupStep1Page.clickTryForFree();

    signupStep1Page.isEmailErrorVisible();
    signupStep1Page.isPasswordErrorVisible();
    signupStep1Page.isTermsErrorVisible();
  });

  /**
   * ✅ Test: Validate UI Error Messages on Step 2 (First Name, Last Name)
   *
   * Steps:
   * 1. Navigate to the signup page.
   * 2. Complete Step 1 with valid email and password.
   * 3. Click the "Next" button without filling any personal details.
   * 4. Validate that error messages appear for:
   *    - Missing first name
   *    - Missing last name
   */
  it('Step 2 page UI Validation', () => {
    cy.visit('/users/sign_up');
    completeSignupStep1(signupStep1Page);  // Fill Step 1 with valid email & password

    signupStep2Page.clickNextButton();  // Click Next without entering details

    signupStep2Page.isFirstNameErrorVisible();
    signupStep2Page.isLastNameErrorVisible();
  });

  /**
   * ✅ Test: Validate UI Error Messages on Step 3 (Company Name, How Did You Hear About Us)
   *
   * Steps:
   * 1. Navigate to the signup page.
   * 2. Complete Step 1 (email, password).
   * 3. Complete Step 2 (first name, last name, phone number).
   * 4. Click the "Create Account" button without filling required fields.
   * 5. Validate that error messages appear for:
   *    - Missing company name
   *    - Missing "How did you hear about us" selection
   */
  it('Step 3 page UI Validation', () => {
    cy.visit('/users/sign_up');

    completeSignupStep1(signupStep1Page);  // Fill Step 1
    completeSignupStep2(signupStep2Page);  // Fill Step 2

    signupStep3Page.clickCreateAccount();  // Try to submit without filling fields

    signupStep3Page.isCompanyNameErrorVisible();
    signupStep3Page.isHearAboutUsErrorVisible();
  });

});
