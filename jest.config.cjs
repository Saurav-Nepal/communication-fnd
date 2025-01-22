module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
    },
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    setupFilesAfterEnv: ['./jsdom.mocks.cjs'],
    globalSetup: './jest.setup.cjs',
    moduleNameMapper: {
        // '@slabs/(.*)': '<rootDir>/packages/$1/src',
        '\\.(css)$': 'identity-obj-proxy',
    },
};
