import { test, expect } from '../fixtures/pomFixtures';
import { completeSignupStep1, completeSignupStep2 } from './helper/signupHelper';
import { getTestData } from './helper/testDataHelper';

/**
 * Test Suite: Navigation Tests for Signup Flow
 * 
 * This test suite validates navigation between the different steps of the signup process.
 */

/**
 * Test: Validate Navigation from Login Page to Signup Page
 * 
 * Steps:
 * 1. Navigate to the base URL.
 * 2. Click the "Start Free Trial" button.
 * 3. Verify the redirection to the signup page.
 */
test('Login Page - Signup Page Navigation', async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.clickStartFreeTrial();
    expect(page.url()).toBe('https://app.circula.com/users/sign_up');
});

/**
 * Test: Validate Navigation Between Step 1 and Step 2 of Signup
 * 
 * Steps:
 * 1. Navigate to the signup page.
 * 2. Complete Step 1 with test data (email & password).
 * 3. Verify that Step 2 is loaded.
 * 4. Click the back button and verify return to Step 1.
 */
test('Step 1 <-> Step 2 Page Navigation', async ({ page, signupStep1Page, signupStep2Page }) => {
    const testData = getTestData();
    await page.goto('/users/sign_up');

    await completeSignupStep1(signupStep1Page);
    expect(await signupStep2Page.isStep2PageLoaded()).toBe(true);

    await signupStep2Page.clickBackButton();
    expect(await signupStep1Page.isStep1PageLoaded()).toBe(true);
});

/**
 * Test: Validate Navigation Between Step 2 and Step 3 of Signup
 * 
 * Steps:
 * 1. Navigate to the signup page.
 * 2. Complete Step 1 (email & password).
 * 3. Complete Step 2 (personal details: first name, last name, phone number).
 * 4. Verify that Step 3 is loaded.
 * 5. Click the back button and verify return to Step 2.
 */
test('Step 2 <-> Step 3 Page Navigation', async ({ page, signupStep1Page, signupStep2Page, signupStep3Page }) => {
    const testData = getTestData();
    await page.goto('/users/sign_up');

    await completeSignupStep1(signupStep1Page);
    await completeSignupStep2(signupStep2Page);
    expect(await signupStep3Page.isStep3PageLoaded()).toBe(true);

    await signupStep3Page.clickBackButton();
    expect(await signupStep2Page.isStep2PageLoaded()).toBe(true);
});
