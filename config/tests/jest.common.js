const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '../..'),

  testEnvironment: 'jest-environment-jsdom',

  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],

  testMatch: ['<rootDir>/src/**/*.test.(js|ts|tsx)'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  setupFiles: ['<rootDir>/config/tests/jest-setup.js'],

  watchPlugins: [
    // 'jest-watch-typeahead/filename',
    // 'jest-watch-typeahead/testname',
    // 'jest-watch-select-projects',
  ],
};
