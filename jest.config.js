module.exports = {
    roots: ['<rootDir>/tests'],
    testMatch: ['**/test_*.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    testEnvironment: 'node',
    verbose: true
};
