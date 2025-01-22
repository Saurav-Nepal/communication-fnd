const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class', "[data-slab-color-scheme='dark']"],
    content: [
        // app content
        `src/**/*.{js,ts,jsx,tsx}`,
        `app/**/*.{js,ts,jsx,tsx}`,
        // include packages if not transpiling
        'packages/**/*.{js,ts,jsx,tsx}',
        // '../../apps/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            borderColor: {
                DEFAULT: 'hsl(var(--border-color))',
            },
            colors: {
                border: 'hsl(var(--border-color))',
                input: 'hsl(var(--input-color))',
                ring: 'hsl(var(--ring-color))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                error: {
                    DEFAULT: 'hsl(var(--error))',
                    foreground: 'hsl(var(--error-foreground))',
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))',
                },
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))',
                },
                info: {
                    DEFAULT: 'hsl(var(--info))',
                    foreground: 'hsl(var(--info-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                neutral: {
                    DEFAULT: 'hsl(var(--neutral))',
                    foreground: 'hsl(var(--neutral-foreground))',
                },
                dialog: {
                    DEFAULT: 'hsl(var(--dialog))',
                    foreground: 'hsl(var(--dialog-foreground))',
                },
                'dialog-header': {
                    DEFAULT: 'hsl(var(--dialog-header))',
                    foreground: 'hsl(var(--dialog-header-foreground))',
                },
                'dialog-footer': {
                    DEFAULT: 'hsl(var(--dialog-footer))',
                    foreground: 'hsl(var(--dialog-footer-foreground))',
                },
            },
            height: {
                'header-height': 'var(--header-height)',
            },
            spacing: {
                'sidebar-submenu-width': 'var(--sidebar-submenu-width)',
                'sidebar-width': 'var(--sidebar-width)',
            },
            borderRadius: {
                lg: 'var(--radius, 0.5rem)',
                md: 'calc(var(--radius, 0.5rem) - 2px)',
                sm: 'calc(var(--radius, 0.5rem) - 4px)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                'stripe-slide': {
                    '0%': { backgroundPosition: '0 0' },
                    '100%': { backgroundPosition: '2.5rem 0' },
                },
                'collapsible-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-collapsible-content-height)' },
                },
                'collapsible-up': {
                    from: { height: 'var(--radix-collapsible-content-height)' },
                    to: { height: '0' },
                },
                'caret-blink': {
                    '0%,70%,100%': { opacity: '1' },
                    '20%,50%': { opacity: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'stripe-slide': 'stripe-slide 1s linear infinite',
                'collapsible-down': 'collapsible-down 0.2s ease-out',
                'collapsible-up': 'collapsible-up 0.2s ease-out',
                'caret-blink': 'caret-blink 1.25s ease-out infinite',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
