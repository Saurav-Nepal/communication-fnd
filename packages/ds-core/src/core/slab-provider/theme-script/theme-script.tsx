import React from 'react';

export interface ThemeScriptProps
    extends React.ComponentPropsWithoutRef<'script'> {
    forceTheme?: string;
    defaultTheme?: string;
    localStorageKey?: string;
}

const getScript = ({
    defaultTheme,
    localStorageKey,
    forceTheme,
}: Pick<
    ThemeScriptProps,
    'defaultTheme' | 'localStorageKey' | 'forceTheme'
>) =>
    forceTheme
        ? `document.documentElement.setAttribute("data-slab-theme", '${forceTheme}');`
        : `try {
  var _theme = window.localStorage.getItem("${localStorageKey}");
  var theme = !!_theme ? _theme : "${defaultTheme}";
  document.documentElement.setAttribute("data-slab-theme", theme);
} catch (e) {}
`;

export function ThemeScript({
    defaultTheme = 'base',
    localStorageKey = 'slab-theme-value',
    forceTheme,
    ...others
}: ThemeScriptProps) {
    return (
        <script
            {...others}
            data-slab-script
            dangerouslySetInnerHTML={{
                __html: getScript({
                    defaultTheme,
                    localStorageKey,
                    forceTheme,
                }),
            }}
        />
    );
}
