import { PartialDeep } from 'type-fest';

import type { SlabTheme } from './theme.types';

export const DEFAULT_THEME: SlabTheme = {
    color: {
        primary: '250 92% 70%',
        primaryForeground: '240 100% 98%',

        secondary: '214.3 31.8% 91.4%',
        secondaryForeground: '220 45% 15%',

        accent: '280 80% 75%',
        accentForeground: '200 35% 95%',

        error: '0 80% 55%',
        errorForeground: '200 35% 95%',

        info: '210 100% 40%',
        infoForeground: '200 35% 95%',

        success: '140 70% 35%',
        successForeground: '200 35% 95%',

        warning: '35 90% 45%',
        warningForeground: '200 35% 95%',

        background: '0 0% 95%',
        foreground: '215.3 19.3% 34.5%',

        card: '0 0% 100%',
        cardForeground: '222.2 84% 4.9%',

        popover: '0 0% 100%',
        popoverForeground: '220 80% 10%',

        dialog: '0 0% 100%',
        dialogForeground: '220 80% 10%',

        muted: '210 40% 96.1%',
        mutedForeground: '215.4 16.3% 44%',

        neutral: '240 32.26% 12.16%',
        neutralForeground: '240.88   9.84% 92%',

        dialogHeader: '220 20% 95%',
        dialogHeaderForeground: '215.3 19.3% 34.5%',

        dialogFooter: '220 20% 95%',
        dialogFooterForeground: '215.3 19.3% 34.5%',

        ringColor: '230 5% 60%',
        borderColor: '230 6% 88%',
        inputColor: '230 6% 88%',
    },

    dimensions: {
        sidebarWidth: '65px',
        sidebarSubmenuWidth: '228px',
        headerHeight: '50px',
        radius: '0.5rem',
    },

    other: {},
    components: {},
};
export const DEFAULT_DARK_THEME: PartialDeep<SlabTheme> = {
    color: {
        primary: '254 86% 58%',
        primaryForeground: '200 35% 95%',

        secondary: '214.3 35% 25%',
        secondaryForeground: '220 45% 95%',

        accent: '280 80% 40%',
        accentForeground: '200 35% 95%',

        error: '0 80% 40%',
        errorForeground: '200 35% 95%',

        info: '210 100% 40%',
        infoForeground: '200 35% 95%',

        success: '140 70% 25%',
        successForeground: '200 35% 95%',

        warning: '35 90% 35%',
        warningForeground: '200 35% 95%',

        background: '222.2 47.16% 9.75%',
        foreground: '215 20.2% 65.1%',

        card: '220 15% 18%',
        cardForeground: '220 15% 90%',

        popover: '220 20% 15%',
        popoverForeground: '220 15% 90%',

        dialog: '220 20% 15%',
        dialogForeground: '220 15% 90%',

        dialogHeader: '220 20% 20%',
        dialogHeaderForeground: '220 15% 90%',

        dialogFooter: '220 20% 20%',
        dialogFooterForeground: '220 15% 90%',

        muted: '210 12% 25%',
        mutedForeground: '210 10% 70%',

        ringColor: '230 5% 40%',
        borderColor: '210 10.71% 21.96%',
        inputColor: '230 6% 30%',
    },
};
