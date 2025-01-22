import type { PartialDeep, StringKeyOf } from 'type-fest';

export interface SlabThemeProps<
    TThemes = SlabThemeOverrideRecord,
    TThemeKeys extends string = InferThemeKeys<TThemes>,
> {
    /** Default theme name, `base` by default */
    defaultTheme?: TThemeKeys;

    /** Base Theme override objects */
    baseTheme?: SlabThemeOverride;

    /** System Themes override objects */
    themes?: TThemes;

    /** Dark System Themes override objects */
    darkThemesOverride?: Partial<Record<TThemeKeys, SlabThemeOverride>>;
}

export interface SlabTheme {
    /** Controls focus ring styles. Supports the following options:
     *  - `auto` – focus ring is displayed only when the user navigates with keyboard (default value)
     *  - `always` – focus ring is displayed when the user navigates with keyboard and mouse
     *  - `never` – focus ring is always hidden (not recommended)
     */
    // focusRing: 'auto' | 'always' | 'never';

    color: {
        /** Primary color in hsl, `` by default */
        primary: string;
        /** Primary text color in hsl, `` by default */
        primaryForeground: string;

        /** Secondary color in hsl, `` by default */
        secondary: string;
        /** Secondary text color in hsl, `` by default */
        secondaryForeground: string;

        /** Accent color in hsl, `` by default */
        accent: string;
        /** Accent text color in hsl, `` by default */
        accentForeground: string;

        /** Error color in hsl, `` by default */
        error: string;
        /** Error text color in hsl, `` by default */
        errorForeground: string;

        /** Info color in hsl, `` by default */
        info: string;
        /** Info text color in hsl, `` by default */
        infoForeground: string;

        /** Success color in hsl, `` by default */
        success: string;
        /** Success text color in hsl, `` by default */
        successForeground: string;

        /** Warning color in hsl, `` by default */
        warning: string;
        /** Warning text color in hsl, `` by default */
        warningForeground: string;

        /** Background color in hsl, `` by default */
        background: string;
        /** Text color in hsl, `` by default */
        foreground: string;

        /** Card color in hsl, `` by default */
        card: string;
        /** Card Foreground color in hsl, `` by default */
        cardForeground: string;

        /** Popover color in hsl, `` by default */
        popover: string;
        /** Popover text color in hsl, `` by default */
        popoverForeground: string;

        /** Dialog color in  hsl, `` by default */
        dialog: string;
        /** Dialog text color in hsl, `` by default */
        dialogForeground: string;

        /** Dialog Header color in hsl, `` by default */
        dialogHeader: string;
        /** Dialog Header text color in hsl, `` by default */
        dialogHeaderForeground: string;

        /** Dialog Footer color in hsl, `` by default */
        dialogFooter: string;
        /** Dialog Footer text color in hsl, `` by default */
        dialogFooterForeground: string;

        /** Muted color in hsl, `` by default */
        muted: string;
        /** Muted text color in hsl, `` by default */
        mutedForeground: string;

        /** Neutral color in hsl, `` by default */
        neutral: string;
        /** Neutral text color in hsl, `` by default */
        neutralForeground: string;

        ringColor: string;
        borderColor: string;
        inputColor: string;
    };

    /**
     * Dimensions of the theme.
     */
    dimensions: {
        /**
         * Width of the sidebar in `px`.
         */
        sidebarWidth: string;

        /**
         * Width of the sidebar submenu in `px`.
         */
        sidebarSubmenuWidth: string;

        /**
         * Height of the header in `px`.
         */
        headerHeight: string;

        /**
         * Radius of the border in `px` or `rem.
         */
        radius: string;
    };

    /** Allows adding `classNames`, `styles` and `defaultProps` to any component */
    components: SlabThemeComponents;

    /** Any other properties that you want to access with the theme objects */
    other: SlabThemeOther;
}

export type SlabColorScheme = 'light' | 'dark' | 'auto';

export type SlabThemeOverride = PartialDeep<SlabTheme>;

export type SlabThemeOverrideRecord = Record<
    string | number,
    SlabThemeOverride
>;

export interface SlabThemeComponent {
    classNames?: string;
    styles?: React.CSSProperties;
    defaultProps?: Record<string, any>;
}

export type SlabThemeComponents = Record<string, SlabThemeComponent>;

export interface SlabThemeOther {
    [key: string]: any;
}

export type InferThemeKeys<TThemes = SlabThemeOverrideRecord> =
    | StringKeyOf<TThemes>
    | 'base';
