const {rootDir} = require('./jest.common');

module.exports = {
  rootDir,

  displayName: 'lint',

  runner: 'jest-runner-eslint',

  testMatch: ['<rootDir>/src/**/*.test.(js|tsx?)'],

  testPathIgnorePatterns: ['node_modules', 'coverage', 'dist', 'other'],
};
