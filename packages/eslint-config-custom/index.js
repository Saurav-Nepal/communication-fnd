module.exports = {
    extends: ['next', 'turbo', 'prettier'],
    rules: {
        'react/display-name': 'off',
        '@next/next/no-html-link-for-pages': 'off',
        'import/no-cycle': [
            'warn',
            {
                maxDepth: 15,
                ignoreExternal: true,
            },
        ],
    },
    parserOptions: {
        babelOptions: {
            presets: [require.resolve('next/babel')],
        },
    },
};
