import type { Config } from 'tailwindcss';

const sharedConfig = require('@slabs/tailwind-config/tailwind.config.js');

const config: Config = {
    // prefix ui lib classes to avoid conflicting with the app
    // prefix: 'ui-',
    presets: [sharedConfig],
    content: [
        // app content
        `src/**/*.{js,ts,jsx,tsx}`,
        // include packages if not transpiling
        '../../packages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontSize: {
                // xs: ['10px', '14px'],
                // sm: ['12px', '16px'],
                // base: ['14px', '20px'],
                // lg: ['16px', '24px'],
                // xl: ['20px', '28px'],
                // '2xl': ['24px', '32px'],
                // '3xl': ['28px', '32px'],
            },
            height: {
                'content-screen': 'calc(100vh - var(--header-height))',
            },
        },
        container: {
            center: true,
            screens: {
                '2xl': '1500px',
            },
        },
    },
};
export default config;
