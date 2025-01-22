import { createContext, useContext } from 'react';

import {
    InferThemeKeys,
    SlabThemeOverride,
    SlabThemeOverrideRecord,
} from '../theme.types';

export interface SlabThemeContextProps<TThemeKeys = string> {
    theme: SlabThemeOverride;
    themes: SlabThemeOverrideRecord;
    darkThemes?: SlabThemeOverrideRecord;

    /** The current theme */
    activeTheme: TThemeKeys;

    /** Sets the theme */
    setTheme: (theme: TThemeKeys) => void;

    /** Clears the theme */
    clearTheme: () => void;
}

export const SlabThemeContext = createContext<SlabThemeContextProps | null>(
    null
);

export const useSafeSlabTheme = () => useContext(SlabThemeContext) ?? undefined;

export function useSlabTheme<TThemes extends SlabThemeOverrideRecord>() {
    const ctx = useContext(SlabThemeContext);
    if (!ctx) {
        throw new Error(
            '@slab/ds-core: SlabProvider was not found in component tree, make sure you have it in your app'
        );
    }

    return ctx as SlabThemeContextProps<InferThemeKeys<TThemes>>;
}
