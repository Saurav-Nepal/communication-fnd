import React from 'react';

import type { SlabColorScheme } from '../theme.types';

export interface ColorSchemeScriptProps
    extends React.ComponentPropsWithoutRef<'script'> {
    forceColorScheme?: 'light' | 'dark';
    defaultColorScheme?: SlabColorScheme;
    localStorageKey?: string;
}

const getScript = ({
    defaultColorScheme,
    localStorageKey,
    forceColorScheme,
}: Pick<
    ColorSchemeScriptProps,
    'defaultColorScheme' | 'localStorageKey' | 'forceColorScheme'
>) =>
    forceColorScheme
        ? `document.documentElement.setAttribute("data-slab-color-scheme", '${forceColorScheme}');`
        : `try {
  var _colorScheme = window.localStorage.getItem("${localStorageKey}");
  var colorScheme = _colorScheme === "light" || _colorScheme === "dark" || _colorScheme === "auto" ? _colorScheme : "${defaultColorScheme}";
  var computedColorScheme = colorScheme !== "auto" ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-slab-color-scheme", computedColorScheme);
} catch (e) {}
`;

export function ColorSchemeScript({
    defaultColorScheme = 'light',
    localStorageKey = 'slab-color-scheme-value',
    forceColorScheme,
    ...others
}: ColorSchemeScriptProps) {
    const _defaultColorScheme = ['light', 'dark', 'auto'].includes(
        defaultColorScheme
    )
        ? defaultColorScheme
        : 'light';

    return (
        <script
            {...others}
            data-slab-script
            dangerouslySetInnerHTML={{
                __html: getScript({
                    defaultColorScheme: _defaultColorScheme,
                    localStorageKey,
                    forceColorScheme,
                }),
            }}
        />
    );
}
