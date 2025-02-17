import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

/**
 * Path to the JSON file containing static test data.
 * This is used to retrieve predefined values while dynamically generating others.
 */
const testDataPath = path.join(__dirname, '../testData/circulaTestData.json');

/**
 * Generates a secure password that meets the following criteria:
 * - Minimum 8 characters
 * - At least one letter
 * - At least one number
 * - Ends with "A!" for added complexity
 * 
 * @returns {string} A randomly generated secure password.
 */
function generateSecurePassword() {
    let password = '';

    // Ensure password meets security criteria before returning
    while (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
        password = faker.internet.password({ length: 8, memorable: false }) + faker.string.numeric(1) + "A!";
    }

    return password;
}

/**
 * Reads and returns test data, dynamically generating some values.
 * 
 * **Generated Dynamically:**
 * - **Email**: Uses `faker` to generate a unique email with the domain `@check.de`.
 * - **Password**: Ensures security criteria via `generateSecurePassword()`.
 * - **First Name & Last Name**: Uses `faker` for random realistic values.
 * - **Company Name**: Uses `faker` for a random company name.
 * - **Phone Number**: Follows German formatting with `+49` country code.
 * 
 * **Retrieved from `circulaTestData.json`:**
 * - **Country**
 * - **How did you hear about us?** (`hearAboutUs`)
 * 
 * @returns {Object} An object containing both static and dynamically generated test data.
 */
export function getTestData() {
    const rawData = fs.readFileSync(testDataPath, 'utf-8');
    const testData = JSON.parse(rawData);

    return {
        email: faker.internet.username().toLowerCase() + '@check.de', // Unique work email
        password: generateSecurePassword(), // Securely generated password
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: `+49 ${faker.string.numeric(3)} ${faker.string.numeric(3)} ${faker.string.numeric(4)}`, // German format
        companyName: faker.company.name(),
        country: testData.country, // From static test data file
        hearAboutUs: testData.hearAboutUs // From static test data file
    };
}
