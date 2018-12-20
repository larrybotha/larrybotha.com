const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '../..'),

  roots: ['<rootDir>', '<rootDir>/config/tests'],

  testEnvironment: 'jest-environment-jsdom',

  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],

  testMatch: ['<rootDir>/src/**/*.test.(js|ts|tsx)'],

  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
      './file-mock.js',
    ),
  },

  testPathIgnorePatterns: ['node_modules', '.cache'],

  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  globals: {
    __PATH_PREFIX__: '',
  },

  setupFiles: ['<rootDir>/config/tests/jest-setup.js'],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
};
