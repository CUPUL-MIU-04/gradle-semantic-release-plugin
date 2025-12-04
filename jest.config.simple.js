module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(execa|strip-final-newline)/)',
  ],
  moduleNameMapper: {
    '^execa$': require.resolve('execa'),
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};
