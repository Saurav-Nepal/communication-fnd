// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
    ignorePatterns: ['apps/**', 'scripts/**', 'packages/ds-table/*'], // TO-DO: temp ignoring ds-table
    extends: ['@slabs/eslint-config/library.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
};
