import { useCallback, useEffect, useRef } from 'react';

import { useIsomorphicEffect, useLocalStorage } from '@slabs/ds-hooks';

import { SlabColorScheme } from '../theme.types';

function setColorSchemeAttribute(
    colorScheme: SlabColorScheme,
    getRootElement: () => HTMLElement | undefined
) {
    const computedColorScheme =
        colorScheme !== 'auto'
            ? colorScheme
            : window?.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light';
    getRootElement()?.setAttribute(
        'data-slab-color-scheme',
        computedColorScheme
    );
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;

interface UseProviderColorSchemeOptions {
    defaultColorScheme: SlabColorScheme;
    forceColorScheme: 'light' | 'dark' | undefined;
    getRootElement: () => HTMLElement | undefined;
    localStorageKey: string;
}

export function useProviderColorScheme({
    defaultColorScheme,
    getRootElement,
    forceColorScheme,
    localStorageKey,
}: UseProviderColorSchemeOptions) {
    const [value, setItem, clearItem] = useLocalStorage({
        key: localStorageKey,
        defaultValue: defaultColorScheme,
        serialize: (value) => value,
    });

    const media = useRef<MediaQueryList>();
    const colorSchemeValue = forceColorScheme || value;

    const setColorScheme = useCallback(
        (colorScheme: SlabColorScheme) => {
            if (!forceColorScheme) {
                setColorSchemeAttribute(colorScheme, getRootElement);
                setItem(colorScheme);
            }
        },
        [colorSchemeValue, forceColorScheme]
    );

    const clearColorScheme = useCallback(() => {
        setColorSchemeAttribute(defaultColorScheme, getRootElement);
        clearItem();
    }, [defaultColorScheme]);

    useIsomorphicEffect(() => {
        setColorSchemeAttribute(value, getRootElement);
    }, []);

    useEffect(() => {
        if (forceColorScheme) {
            setColorSchemeAttribute(forceColorScheme, getRootElement);
            return () => {};
        }
        setColorSchemeAttribute(value, getRootElement);
        media.current = window?.matchMedia('(prefers-color-scheme: dark)');
        const listener: MediaQueryCallback = (event) => {
            if (value === 'auto') {
                setColorSchemeAttribute(
                    event.matches ? 'dark' : 'light',
                    getRootElement
                );
            }
        };
        media.current?.addEventListener('change', listener);
        return () => media.current?.removeEventListener('change', listener);
    }, [value, forceColorScheme]);

    return { colorScheme: colorSchemeValue, setColorScheme, clearColorScheme };
}
