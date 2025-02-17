const { faker } = require('@faker-js/faker');
const testData = require('../fixtures/circulaTestData.json'); // Load test data from fixtures

/**
 * Generates a secure password that meets the following criteria:
 * - Minimum 8 characters
 * - At least one letter
 * - At least one number
 * - Ends with "A!" for added complexity
 */
function generateSecurePassword() {
    let password = '';

    while (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
        password = faker.internet.password({ length: 8, memorable: false }) + faker.string.numeric(1) + "A!";
    }

    return password;
}

/**
 * Reads and returns test data, replacing "DYNAMIC" fields with faker-generated values.
 */
function getTestData() {
    return {
        email: testData.email === "DYNAMIC" 
            ? faker.internet.email().replace(/@.*$/, '@check.de') // Ensures the domain is @check.de
            : testData.email,
        password: testData.password === "DYNAMIC" ? generateSecurePassword() : testData.password,
        firstName: testData.firstName === "DYNAMIC" ? faker.name.firstName() : testData.firstName,
        lastName: testData.lastName === "DYNAMIC" ? faker.name.lastName() : testData.lastName,
        phoneNumber: testData.phoneNumber === "DYNAMIC"
            ? `+49 ${faker.string.numeric(3)} ${faker.string.numeric(3)} ${faker.string.numeric(4)}`
            : testData.phoneNumber,
        companyName: testData.companyName === "DYNAMIC" ? faker.company.name() : testData.companyName,
        country: testData.country || "Germany", // Default if missing
        hearAboutUs: testData.hearAboutUs || "Google" // Default if missing
    };
}

module.exports = { getTestData };
