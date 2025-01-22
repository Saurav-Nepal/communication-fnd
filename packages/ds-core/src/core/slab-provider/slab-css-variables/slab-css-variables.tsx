import React, { useCallback, useMemo } from 'react';

import { isObject, keys } from '@slabs/ds-utils';

import { convertCssVariables } from '../convert-css-variables/convert-css-variables';
import { useSlabTheme } from '../slab-theme-provider/slab-theme.context';
import { SlabTheme } from '../theme.types';
import { cssVariablesResolver } from './css-variables-resolver';

interface SlabCssVariablesProps {
    readonly cssVariablesSelector?: string;
}

export function SlabCssVariables({
    cssVariablesSelector = ':root',
}: SlabCssVariablesProps) {
    const { themes, darkThemes } = useSlabTheme();

    const getCssVariables = useCallback(
        (groupKey: keyof Pick<SlabTheme, 'color' | 'dimensions'>) => {
            let css = '';

            css += convertCssVariables(
                {
                    light: cssVariablesResolver(themes?.['base']?.[groupKey]),
                    dark: {
                        ['color-scheme' as any]: 'dark', // To force color-scheme
                        ...cssVariablesResolver(
                            darkThemes?.['base']?.[groupKey]
                        ),
                    },
                },
                cssVariablesSelector
            );

            if (!isObject(themes)) return css;

            keys(themes).forEach(
                (themeKey) =>
                    (css += convertCssVariables(
                        {
                            light: cssVariablesResolver(
                                themes[themeKey]?.[groupKey]
                            ),
                            dark: cssVariablesResolver(
                                darkThemes?.[themeKey]?.[groupKey]
                            ),
                        },
                        `${cssVariablesSelector}[data-slab-theme="${themeKey}"]`
                    ))
            );

            return css;
        },
        [cssVariablesSelector, themes, darkThemes]
    );

    const styleCssColors = useMemo(
        () => getCssVariables('color'),
        [getCssVariables]
    );
    const styleCssDimensions = useMemo(
        () => getCssVariables('dimensions'),
        [getCssVariables]
    );

    return (
        <>
            {styleCssColors && (
                <style
                    data-slabs-style-colors
                    dangerouslySetInnerHTML={{
                        __html: styleCssColors,
                    }}
                />
            )}
            {styleCssDimensions && (
                <style
                    data-slabs-style-dimensions
                    dangerouslySetInnerHTML={{
                        __html: styleCssDimensions,
                    }}
                />
            )}
        </>
    );
}
