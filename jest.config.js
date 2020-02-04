/* eslint-disable max-len */

module.exports = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/*.{js,vue}',
  ],

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    'html',
    'text-summary',
  ],

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],

  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
