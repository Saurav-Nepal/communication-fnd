const sharedConfig = require('@slabs/tailwind-config/tailwind.config.js');

module.exports = {
    // prefix ui lib classes to avoid conflicting with the app
    // prefix: 'ui-',
    presets: [sharedConfig],
    content: [
        // app content
        `src/**/*.{js,ts,jsx,tsx}`,
        // `apps/**/*.{js,ts,jsx,tsx}`,
        // include packages if not transpiling
        'packages/**/*.{js,ts,jsx,tsx}',
        '.storybook/*.{js,ts,jsx,tsx}',
        // '../../apps/**/*.{js,ts,jsx,tsx}',
    ],
};
