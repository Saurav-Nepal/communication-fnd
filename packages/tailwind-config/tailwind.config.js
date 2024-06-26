const themes = require('themes');
const { withOpacityValue } = require('./common.utils');
const polarisColors = require('./polaris.colors');
const polarisShadows = require('./polaris.shadows');
const polarisFontSize = require('./polaris.fontsize');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        // app content
        `src/**/*.{js,ts,jsx,tsx}`,
        `pages/**/*.{js,ts,jsx,tsx}`,
        // include packages if not transpiling
        '../../packages/**/*.{js,ts,jsx,tsx}',
        // '../../apps/**/*.{js,ts,jsx,tsx}',
    ],
    layers: {
        custom: [
            'text-link-primary',
            'text-link-secondary',
            'text-link-tertiary',
            'text-link',
            'col-flex',
            'row-flex',
            'centralize',
        ],
    },
    theme: {
        fontFamily: {
            rubik: 'var(--rubik)',
            jost: 'var(--jost)',
        },
        extend: {
            screens: {
                desktop: '130rem',
            },
            spacing: {
                'content-screen': 'calc(100vh - var(--main-header-height))',
            },
            colors: {
                'party-status-open': '#B4B4B4',
                'party-status-submitted': '#8A8B8C',
                'party-status-pending': '#1C61A1',
                'party-status-hold': '#F80',
                'vendor-icon': '#A76706',
                vendor: '#A767061A',
                orange: '#ff703c',
                'polaris-business': '#D9F5F3',
                'polaris-business-icon': '#14A69D',
                'polaris-customer': '#F1DFCB',
                'polaris-customer-icon': '#B36202',
                'polaris-employee': '#D9E4F5',
                'polaris-employee-icon': '#144EA6',
                base: {
                    secondary: withOpacityValue('--text-base-secondary'),
                    primary: withOpacityValue('--text-base-primary'),
                    tertiary: withOpacityValue('--text-base-tertiary'),
                    '200-light': withOpacityValue('--base-200-light'),
                },
                ...polarisColors,
            },
            borderColor: {
                'light-primary': 'var(--border-light-primary)',
                'dark-primary': 'var(--border-dark-primary)',
                'dark-hover': 'var(--border-dark-hover)',
                'base-200-light': 'rgb(var(--base-200-light))',
            },
            backgroundColor: {
                'error-dark': '#a82c13',
                'success-dark': '#006443',
            },
            fontSize: {
                ...polarisFontSize,
                xxs: ['11px', '12px'],
                xs: ['12px', '16px'],
                sm: ['13px', '20px'],
                base: ['14px', '20px'],
                lg: ['16px', '24px'],
                xl: ['18px', '24px'],
                // '2xl': '1.42rem',
                // '3xl': '1.6rem',
                // '4xl': '1.8rem',
                // '5xl': '2.03rem',
                // '6xl': '2.28rem',
                // '7xl': '2.57rem',
            },
            fontWeight: {
                'polaris-light': 350,
                'polaris-normal': 450,
                'polaris-medium': 550,
                'polaris-semibold': 650,
                'polaris-bold': 750,
            },
            boxShadow: {
                xs: '0px 3px 6px rgba(148, 163, 184, 0.15)',
                sm: '0px 6px 12px rgba(148, 163, 184, 0.15)',
                md: '0px 10px 20px rgba(148, 163, 184, 0.2)',
                lg: '0px 16px 32px rgba(148, 163, 184, 0.3)',
                xl: '0px 16px 32px rgba(148, 163, 184, 0.3)',
                button: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                modal: '0px 16px 32px 0px rgba(29, 33, 45, 0.10), 0px 1px 4px 0px rgba(29, 33, 45, 0.15), 0px 0px 1px 0px rgba(29, 33, 45, 0.20)',
                ...polarisShadows,
            },
            animation: {
                'reverse-spin': 'reverse-spin 1s linear infinite',
                'modal-fadeInDown': 'modal-fadeInDown .2s',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            transitionProperty: {
                width: 'width',
            },
            keyframes: {
                'reverse-spin': {
                    from: {
                        transform: 'rotate(360deg)',
                    },
                },
                'modal-fadeInDown': {
                    '0%': {
                        opacity: 0,
                        transform: 'translate3d(0,-20px,0)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateZ(0);',
                    },
                },
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
        },
    },
    plugins: [require('daisyui'), require('tailwindcss-animate')],
    daisyui: {
        themes: [{ ...themes }],
        logs: false,
    },
};
