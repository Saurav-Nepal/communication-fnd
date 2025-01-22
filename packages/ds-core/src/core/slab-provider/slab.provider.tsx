import React, { useMemo } from 'react';

import { SlabThemeProvider } from './slab-theme-provider/slab-theme.provider';
import { SlabContext } from './slab.context';
import type {
    SlabColorScheme,
    SlabThemeOverrideRecord,
    SlabThemeProps,
} from './theme.types';
import { useProviderColorScheme } from './use-provider-color-scheme/use-provider-color-scheme';

export interface SlabProviderProps<TThemes> extends SlabThemeProps<TThemes> {
    /** Default color scheme value used when `colorSchemeManager` cannot retrieve value from external storage, `light` by default */
    readonly defaultColorScheme?: SlabColorScheme;

    /** Force color scheme value, `undefined` by default */
    readonly forceColorScheme?: 'light' | 'dark';

    /** Local storage key used to store color scheme value, `slab-color-scheme-value` by default */
    readonly localStorageColorSchemaKey?: string;

    /** CSS selector to which CSS variables should be added, `:root` by default */
    readonly cssVariablesSelector?: string;

    /** Function to resolve root element to set `data-mantine-color-scheme` attribute, must return undefined on server, `() => document.documentElement` by default */
    getRootElement?: () => HTMLElement | undefined;

    /** Your application */
    children?: React.ReactNode;
}

export const SlabProvider = <TThemes extends SlabThemeOverrideRecord>({
    defaultTheme = 'base',
    baseTheme,
    themes,
    darkThemesOverride,
    defaultColorScheme = 'light',
    forceColorScheme,
    localStorageColorSchemaKey = 'slab-color-scheme-value',
    cssVariablesSelector = ':root',
    getRootElement = () => document.documentElement,
    children,
}: SlabProviderProps<TThemes>) => {
    const { colorScheme, setColorScheme, clearColorScheme } =
        useProviderColorScheme({
            defaultColorScheme,
            forceColorScheme,
            getRootElement,
            localStorageKey: localStorageColorSchemaKey,
        });

    const value = useMemo(
        () => ({
            cssVariablesSelector,
            getRootElement,
            colorScheme,
            setColorScheme,
            clearColorScheme,
        }),
        [
            cssVariablesSelector,
            getRootElement,
            colorScheme,
            setColorScheme,
            clearColorScheme,
        ]
    );

    return (
        <SlabContext.Provider value={value}>
            <SlabThemeProvider
                defaultTheme={defaultTheme}
                baseTheme={baseTheme}
                themes={themes}
                darkThemesOverride={darkThemesOverride}
            >
                {children}
            </SlabThemeProvider>
        </SlabContext.Provider>
    );
};
