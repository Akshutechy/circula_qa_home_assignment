import SignupStep1Page from '../e2e/pages/SignupStep1Page';
import SignupStep2Page from '../e2e/pages/SignupStep2Page';
import SignupStep3Page from '../e2e/pages/SignupStep3Page';
import { getTestData } from './testDataHelper';

/**
 * Retrieves test data from the test data helper.
 * This ensures all signup steps use dynamic and consistent test data.
 */
const testData = getTestData();

/**
 * Completes Step 1 of the signup process by filling in the user's email and password.
 * @param {SignupStep1Page} signupStep1Page - The Signup Step 1 page instance.
 */
export function completeSignupStep1(signupStep1Page) {
    signupStep1Page.fillSignupForm(testData.email, testData.password);
}

/**
 * Completes Step 2 of the signup process by entering personal details.
 * @param {SignupStep2Page} signupStep2Page - The Signup Step 2 page instance.
 */
export function completeSignupStep2(signupStep2Page) {
    signupStep2Page.fillPersonalDetails(testData.firstName, testData.lastName, testData.phoneNumber);
}

/**
 * Completes Step 3 of the signup process by entering company details.
 * @param {SignupStep3Page} signupStep3Page - The Signup Step 3 page instance.
 */
export function completeSignupStep3(signupStep3Page) {
    signupStep3Page.fillCompanyDetails(testData.companyName, testData.country, testData.hearAboutUs);
}
