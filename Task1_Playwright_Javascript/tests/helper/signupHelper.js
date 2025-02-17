import { SignupStep1Page } from '../pages/SignupStep1Page';
import { SignupStep2Page } from '../pages/SignupStep2Page';
import { SignupStep3Page } from '../pages/SignupStep3Page';
import { getTestData } from './testDataHelper';

/**
 * Retrieves test data from the test data helper.
 * This ensures all signup steps use dynamic and consistent test data.
 */
const testData = getTestData();

/**
 * Completes Step 1 of the signup process by filling in the user's email and password.
 * @param signupStep1Page - The Signup Step 1 page instance.
 * @returns {Promise<void>} A promise that resolves when the step is completed.
 */
export async function completeSignupStep1(signupStep1Page) {
    await signupStep1Page.fillSignupForm(testData.email, testData.password);
}

/**
 * Completes Step 2 of the signup process by entering personal details.
 * @param signupStep2Page - The Signup Step 2 page instance.
 * @returns {Promise<void>} A promise that resolves when the step is completed.
 */
export async function completeSignupStep2(signupStep2Page) {
    await signupStep2Page.fillPersonalDetails(testData.firstName, testData.lastName, testData.phoneNumber);
}

/**
 * Completes Step 3 of the signup process by entering company details.
 * @param signupStep3Page - The Signup Step 3 page instance.
 * @returns {Promise<void>} A promise that resolves when the step is completed.
 */
export async function completeSignupStep3(signupStep3Page) {
    await signupStep3Page.fillCompanyDetails(testData.companyName, testData.country, testData.hearAboutUs);
}
