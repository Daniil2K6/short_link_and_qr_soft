module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/admin/**', '!src/database/**', '!src/services/ShortCodeService.js'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', 'ShortCodeService'],
};
