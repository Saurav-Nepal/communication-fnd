import { useCallback, useEffect } from 'react';

import { useIsomorphicEffect, useLocalStorage } from '@slabs/ds-hooks';

function setThemeAttribute(
    theme: string,
    getRootElement: () => HTMLElement | undefined
) {
    getRootElement()?.setAttribute('data-slab-theme', theme);
}

interface UseProviderColorSchemeOptions<TThemeKeys extends string> {
    defaultTheme: TThemeKeys;
    forceTheme: TThemeKeys | undefined;
    getRootElement: () => HTMLElement | undefined;
    localStorageKey: string;
}

export function useProviderTheme<TThemeKeys extends string>({
    defaultTheme,
    getRootElement,
    forceTheme,
    localStorageKey,
}: UseProviderColorSchemeOptions<TThemeKeys>) {
    const [value, setItem, clearItem] = useLocalStorage({
        key: localStorageKey,
        defaultValue: defaultTheme,
        serialize: (value) => value,
        deserialize: (value) => value as TThemeKeys,
    });

    const themeValue = forceTheme || value;

    const setTheme = useCallback(
        (theme: TThemeKeys) => {
            if (!forceTheme) {
                setThemeAttribute(theme, getRootElement);
                setItem(theme);
            }
        },
        [themeValue, forceTheme]
    );

    const clearTheme = useCallback(() => {
        setThemeAttribute(defaultTheme, getRootElement);
        clearItem();
    }, [defaultTheme]);

    useIsomorphicEffect(() => {
        setThemeAttribute(value, getRootElement);
    }, []);

    useEffect(() => {
        if (forceTheme) return setThemeAttribute(forceTheme, getRootElement);
        setThemeAttribute(value, getRootElement);
    }, [value, forceTheme]);

    return {
        theme: themeValue,
        setTheme,
        clearTheme,
    };
}
