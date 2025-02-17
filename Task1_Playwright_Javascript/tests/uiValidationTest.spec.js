import { test, expect } from '../fixtures/pomFixtures';
import { getTestData } from './helper/testDataHelper';
import { completeSignupStep1, completeSignupStep2 } from './helper/signupHelper';

/**
 * Test Suite: UI Validation Tests for Signup Flow
 *
 * This test suite verifies that UI validation messages appear correctly when
 * users attempt to proceed without providing required inputs.
 */

/**
 * Test: Validate UI Error Messages on Step 1 (Email, Password, Terms)
 *
 * Steps:
 * 1. Navigate to the signup page.
 * 2. Click the "Try for Free" button without filling any fields.
 * 3. Validate that error messages appear for:
 *    - Missing email
 *    - Missing password
 *    - Unchecked terms checkbox
 */
test('Step 1 page UI Validation', async ({ page, signupStep1Page }) => {
    await page.goto('/users/sign_up');
    await signupStep1Page.clickTryForFree();

    expect(await signupStep1Page.isEmailErrorVisible()).toBe(true);
    expect(await signupStep1Page.isPasswordErrorVisible()).toBe(true);
    expect(await signupStep1Page.isTermsErrorVisible()).toBe(true);
});

/**
 * Test: Validate UI Error Messages on Step 2 (First Name, Last Name)
 *
 * Steps:
 * 1. Navigate to the signup page.
 * 2. Complete Step 1 with valid email and password.
 * 3. Click the "Next" button without filling any personal details.
 * 4. Validate that error messages appear for:
 *    - Missing first name
 *    - Missing last name
 */
test('Step 2 page UI Validation', async ({ page, signupStep1Page, signupStep2Page }) => {
    await page.goto('/users/sign_up');
    await completeSignupStep1(signupStep1Page);

    await signupStep2Page.clickNextButton();
    expect(await signupStep2Page.isFirstNameErrorVisible()).toBe(true);
    expect(await signupStep2Page.isLastNameErrorVisible()).toBe(true);
});

/**
 * Test: Validate UI Error Messages on Step 3 (Company Name, How Did You Hear About Us)
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
test('Step 3 page UI Validation', async ({ page, signupStep1Page, signupStep2Page, signupStep3Page }) => {
    await page.goto('/users/sign_up');
    await completeSignupStep1(signupStep1Page);
    await completeSignupStep2(signupStep2Page);

    await signupStep3Page.clickCreateAccount();
    expect(await signupStep3Page.isCompanyNameErrorVisible()).toBe(true);
    expect(await signupStep3Page.isHearAboutUsErrorVisible()).toBe(true);
});
