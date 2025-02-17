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
function generateSecurePassword(): string {
    let password = '';

    // Ensure password meets criteria before returning
    while (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
        password = faker.internet.password({ length: 8, memorable: false }) + faker.string.numeric(1) + "A!";
    }

    return password;
}

/**
 * Reads and returns test data, dynamically generating some values.
 * 
 * - Email is dynamically generated using `faker`, ensuring unique values.
 * - Password follows security criteria using `generateSecurePassword()`.
 * - First Name, Last Name, and Company Name are generated dynamically.
 * - Phone Number is formatted with a fixed `+49` country code (Germany).
 * - Country and "How did you hear about us?" are retrieved from `circulaTestData.json`.
 * 
 * @returns {Record<string, string>} A test data object with dynamically generated and static values.
 */
export function getTestData(): Record<string, string> {
    const rawData = fs.readFileSync(testDataPath, 'utf-8');
    const testData = JSON.parse(rawData);

    return {
        email: faker.internet.username().toLowerCase() + '@check.de', // Ensuring unique work email
        password: generateSecurePassword(), // Ensuring password meets security criteria
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: `+49 ${faker.string.numeric(3)} ${faker.string.numeric(3)} ${faker.string.numeric(4)}`, // German format
        companyName: faker.company.name(),
        country: testData.country, // Retrieved from test data file
        hearAboutUs: testData.hearAboutUs // Retrieved from test data file
    };
}
