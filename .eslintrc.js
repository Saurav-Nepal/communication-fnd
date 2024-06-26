module.exports = {
    root: true,
    rules: {
        'react/display-name': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/no-cycle': 'off',
    },
    // This tells ESLint to load the config from the package `eslint-config-custom`
    extends: ['custom'],
    settings: {
        next: {
            rootDir: ['apps/*/'],
        },
    },
};
