module.exports = {
  testEnvironment: 'node',
  rootDir: './src',
  testPathIgnorePatterns: [
    '<rootDir>/../node_modules/',
    'helpers',
  ],
  collectCoverage: false, // report code coverage
  collectCoverageFrom: [ // Collect coverage from these files
    '**/*.js',
    '!**/node_modules/**',
    '!**/build/**',
  ],
  verbose: true,
};
