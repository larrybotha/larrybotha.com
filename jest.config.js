module.exports = {
  ...require('./config/tests/jest.common'),

  projects: ['./config/tests/jest.client.js', './config/tests/jest.lint.js'],

  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
};
