import { SignupStep1Page } from '../pages/SignupStep1Page';
import { SignupStep2Page } from '../pages/SignupStep2Page';
import { SignupStep3Page } from '../pages/SignupStep3Page';
import { getTestData } from '../helper/testDataHelper';

/**
 * Retrieves test data from the test data helper.
 * This ensures all signup steps use dynamic and consistent test data.
 */
const testData = getTestData();

/**
 * Completes Step 1 of the signup process by filling in the user's email and password.
 * @param {SignupStep1Page} signupStep1Page - Instance of the SignupStep1Page class.
 * @returns {Promise<void>} A promise that resolves when the step is completed.
 */
export async function completeSignupStep1(signupStep1Page: SignupStep1Page): Promise<void> {
    await signupStep1Page.fillSignupForm(testData.email, testData.password);
}

/**
 * Completes Step 2 of the signup process by entering personal details.
 * @param {SignupStep2Page} signupStep2Page - Instance of the SignupStep2Page class.
 * @returns {Promise<void>} A promise that resolves when the step is completed.
 */
export async function completeSignupStep2(signupStep2Page: SignupStep2Page): Promise<void> {
    await signupStep2Page.fillPersonalDetails(testData.firstName, testData.lastName, testData.phoneNumber);
}

/**
 * Completes Step 3 of the signup process by entering company details.
 * @param {SignupStep3Page} signupStep3Page - Instance of the SignupStep3Page class.
 * @returns {Promise<void>} A promise that resolves when the step is completed.
 */
export async function completeSignupStep3(signupStep3Page: SignupStep3Page): Promise<void> {
    await signupStep3Page.fillCompanyDetails(testData.companyName, testData.country, testData.hearAboutUs);
}
