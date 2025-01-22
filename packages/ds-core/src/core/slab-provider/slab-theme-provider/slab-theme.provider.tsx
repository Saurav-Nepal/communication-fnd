import React, { useMemo } from 'react';

import { deepMerge } from '@slabs/ds-utils';

import { DEFAULT_DARK_THEME, DEFAULT_THEME } from '../default-theme';
import { mergeSlabTheme } from '../merge-slab-theme/merge-slab-theme';
import { SlabCssVariables } from '../slab-css-variables/slab-css-variables';
import {
    InferThemeKeys,
    SlabThemeOverrideRecord,
    SlabThemeProps,
} from '../theme.types';
import { useProviderTheme } from '../use-provider-theme/use-provider-theme';
import { useSlabColorScheme } from '../use-slab-color-scheme/use-slab-color-scheme';
import {
    SlabThemeContext,
    SlabThemeContextProps,
    useSafeSlabTheme,
} from './slab-theme.context';

export interface SlabThemeProviderProps<TThemes>
    extends SlabThemeProps<TThemes> {
    /** Your application or part of the application that requires different theme */
    children: React.ReactNode;

    /** Force theme value, `undefined` by default */
    readonly forceTheme?: InferThemeKeys<TThemes>;

    /** Local storage key used to store theme value, `slab-theme-value` by default */
    readonly localStorageKey?: string;

    readonly inherit?: boolean;
    readonly cssVariablesSelector?: string;

    /** Function to resolve root element to set `data-mantine-color-scheme` attribute, must return undefined on server, `() => document.documentElement` by default */
    getRootElement?: () => HTMLElement | undefined;
}

export const SlabThemeProvider = <TTheme extends SlabThemeOverrideRecord>({
    defaultTheme = 'base',
    baseTheme = {},
    themes,
    darkThemesOverride,
    children,
    inherit = true,
    forceTheme,
    localStorageKey = 'slab-theme-value',
    cssVariablesSelector = ':root',
    getRootElement = () => document.documentElement,
}: SlabThemeProviderProps<TTheme>) => {
    const parentThemeValue = useSafeSlabTheme();
    const { computedColorScheme } = useSlabColorScheme();
    const {
        theme: activeTheme,
        setTheme,
        clearTheme,
    } = useProviderTheme({
        defaultTheme,
        forceTheme,
        getRootElement,
        localStorageKey,
    });

    const value = useMemo(
        () =>
            mergeSlabTheme(
                DEFAULT_THEME,
                DEFAULT_DARK_THEME,
                baseTheme,
                themes,
                darkThemesOverride
            ) as SlabThemeContextProps,
        [defaultTheme, baseTheme, themes, darkThemesOverride]
    );
    const mergedValue = useMemo(() => {
        let finalValues = value;

        if (inherit && parentThemeValue) {
            finalValues = deepMerge(
                parentThemeValue,
                mergeSlabTheme({}, {}, baseTheme, themes, darkThemesOverride)
            );
        }

        const lightTheme = finalValues.themes[activeTheme];
        const darkTheme = finalValues.darkThemes?.[activeTheme];

        const theme =
            computedColorScheme === 'dark' && darkTheme
                ? darkTheme
                : lightTheme;

        return {
            ...finalValues,
            theme,
            activeTheme,
            setTheme,
            clearTheme,
        } as SlabThemeContextProps;
    }, [activeTheme, computedColorScheme, parentThemeValue, value, inherit]);

    return (
        <SlabThemeContext.Provider value={mergedValue}>
            <SlabCssVariables cssVariablesSelector={cssVariablesSelector} />
            {children}
        </SlabThemeContext.Provider>
    );
};
