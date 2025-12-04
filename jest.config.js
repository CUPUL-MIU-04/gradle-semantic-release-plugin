module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      useESM: false,
    }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!execa|strip-final-newline|npm-run-path|path-key|onetime|mimic-fn|human-signals)',
  ],
  moduleNameMapper: {
    '^execa$': require.resolve('execa'),
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  maxWorkers: 1,
  testTimeout: 30000,
};
