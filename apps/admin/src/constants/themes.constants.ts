import { createTheme } from '@slabs/ds-core';

const red = createTheme({
    color: {
        foreground: '0 0% 3.9%',
        card: '0 0% 100%',
        cardForeground: '0 0% 3.9%',
        popover: '0 0% 100%',
        popoverForeground: '0 0% 3.9%',
        primary: '0 72.2% 50.6%',
        primaryForeground: '0 85.7% 97.3%',
        secondary: '0 0% 96.1%',
        secondaryForeground: '0 0% 9%',
        muted: '0 0% 96.1%',
        mutedForeground: '0 0% 45.1%',
        accent: '0 0% 96.1%',
        accentForeground: '0 0% 9%',
        borderColor: '0 0% 89.8%',
    },
});
const blue = createTheme({
    color: {
        foreground: '222.2 84% 4.9%',
        card: '0 0% 100%',
        background: '0 0% 95%',
        cardForeground: '222.2 84% 4.9%',
        popover: '0 0% 100%',
        popoverForeground: '222.2 84% 4.9%',
        primary: '264 100% 29%',
        primaryForeground: '210 40% 98%',
        secondary: '210 40% 96.1%',
        secondaryForeground: '222.2 47.4% 11.2%',
        muted: '210 40% 96.1%',
        mutedForeground: '215.4 16.3% 46.9%',
        accent: '210 40% 96.1%',
        accentForeground: '222.2 47.4% 11.2%',
        borderColor: '214.3 31.8% 91.4%',
    },
    components: {
        button: {
            defaultProps: {
                size: 'xs',
            },
            classNames: 'shadow-sm',
        },
    },
});

export default { red, blue };
