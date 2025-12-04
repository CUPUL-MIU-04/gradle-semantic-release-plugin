module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'jest-esm-transformer',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(execa|fs-extra)/)',
  ],
  extensionsToTreatAsEsm: ['.ts'],
};
