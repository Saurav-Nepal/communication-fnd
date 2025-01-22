import { PartialDeep } from 'type-fest';

import {
    deepMerge,
    isKeyInObject,
    isObject,
    keys,
    pickKeys,
} from '@slabs/ds-utils';

import type {
    SlabTheme,
    SlabThemeOverride,
    SlabThemeOverrideRecord,
} from '../theme.types';

export function mergeSlabTheme(
    currentTheme: PartialDeep<SlabTheme>,
    currentDarkTheme: PartialDeep<SlabTheme>,
    baseOverride?: SlabThemeOverride,
    themesOverride?: SlabThemeOverrideRecord,
    darkThemeOverride?: unknown
) {
    const baseTheme = deepMerge(currentTheme, baseOverride);
    const baseDarkTheme = deepMerge(
        currentDarkTheme,
        (darkThemeOverride as any)?.['base'] ?? {}
    );
    const themes: SlabThemeOverrideRecord = { base: baseTheme };
    const darkThemes: SlabThemeOverrideRecord = {};

    if (isObject(themesOverride)) {
        keys(themesOverride).forEach((themeKey) => {
            // Merging light theme with override.
            themes[themeKey] = deepMerge(baseTheme, themesOverride[themeKey]);

            // Picked color schema from light theme.
            const pickedColorSchema = pickKeys(themes[themeKey] ?? {}, [
                'color.primary',
                'color.secondary',
                'color.accent',
                'color.success',
                'color.info',
                'color.warning',
                'color.error',
            ]);

            // Merging picked color schema with dark theme override.
            darkThemes[themeKey] = deepMerge(
                baseDarkTheme,
                deepMerge(
                    pickedColorSchema,
                    (darkThemeOverride as any)?.[themeKey] ?? {}
                )
            );
        });
    }

    if (!isKeyInObject(darkThemes, 'base')) {
        darkThemes['base'] = baseDarkTheme;
    }

    return {
        themes,
        darkThemes,
    };
}
