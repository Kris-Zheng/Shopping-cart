module.exports = {
  testTimeout: 60000,
  preset: 'jest-puppeteer',
  globals: {
    BASE_URL: process.env.E2E_HOST || 'http://localhost:8000/#/',
    TIMEOUT: 10000,
  },
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
}