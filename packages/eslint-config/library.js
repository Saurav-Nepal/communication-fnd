const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        'eslint:recommended',
        'prettier',
        'turbo',
        'plugin:jest/recommended',
    ],
    plugins: ['jest', 'only-warn', 'check-file', '@typescript-eslint'],
    globals: {
        React: true,
        JSX: true,
        window: 'readonly',
        document: 'readonly',
        alert: 'readonly',
    },
    env: {
        node: true,
    },
    parserOptions: {
        project,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: [
        // Ignore dotfiles
        '.*.js',
        'node_modules/',
        'dist/',
    ],
    overrides: [
        {
            files: ['*.js?(x)', '*.ts?(x)'],
        },
    ],
    rules: {
        'jest/no-export': 'off',
        'jest/expect-expect': 'off',
        'jest/valid-title': 'off',
        'wrap-iife': 'off',
        'import/no-relative-packages': 'off',
        'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'none',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        // Folder & file naming rules
        'check-file/filename-naming-convention': [
            'error',
            {
                // '**/*.{jsx,tsx,story.tsx}': 'PASCAL_CASE',
                '**/*.{js,ts,jsx,tsx}': 'KEBAB_CASE',
                // '**/*/!(index).{js,ts,test.ts}': '<1>',
            },
            { ignoreMiddleExtensions: true },
        ],
        // Variable & function naming rules
        '@typescript-eslint/naming-convention': [
            'error',
            // {
            //     selector: ['variable'],
            //     types: ['array', 'number', 'string'],
            //     format: ['camelCase', 'UPPER_CASE'],
            //     leadingUnderscore: 'allow',
            //     trailingUnderscore: 'allow',
            // },
            // {
            //     selector: ['function'],
            //     format: ['PascalCase'],
            // },
            // {
            //     selector: ['variable'],
            //     types: ['function'],
            //     format: ['PascalCase'],
            // },
            {
                selector: 'variable',
                types: ['boolean'],
                format: ['PascalCase'],
                prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'variable',
                modifiers: ['destructured'],
                format: null,
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'typeParameter',
                format: ['PascalCase'],
                prefix: ['T'],
            },
        ],
    },
};
