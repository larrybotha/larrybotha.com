module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['**/__tests__/*.test.+(ts|tsx|js)'],
  setupFiles: ['./__tests__/jestSetup.ts'],
};
